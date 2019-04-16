package org.unipro.ugene.web.coverage;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import javafx.util.Pair;
import org.unipro.ugene.web.model.AppSettings;
import org.unipro.ugene.web.model.CoverageStaticIssue;
import org.unipro.ugene.web.model.UserSettings;
import org.unipro.ugene.web.service.CoverageStaticIssueService;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StaticRunner {

    private final boolean fullPathToSources = false;

    private final UserSettings settings;
    private final AppSettings app;
    private final CoverageStaticIssueService coverageStaticIssueService;

    public StaticRunner(CoverageStaticIssueService coverageStaticIssueService,
                        UserSettings settings,
                        AppSettings app) {
        this.coverageStaticIssueService = coverageStaticIssueService;
        this.settings = settings;
        this.app = app;
    }

    public UserSettings getSettings() {
        return settings;
    }

    public AppSettings getApp() {
        return app;
    }

    public String runSonarRunner() {
        String check = checkSettings();
        if (check != null) {
            return check;
        }
        return null;
    }

    private String checkSettings() {
        /*
          local sonarRunner = path.join(settings.workDir, SONAR_RUNNER)
          local appDir = path.join(settings.workDir, tostring(app.id) .. "-static")
          local sourceLink = path.join(appDir, 'src')
          local sonarTemplate = path.join(settings.workDir, SONAR_TEMPLATE)
          local sonarSettings = path.join(appDir, 'sonar-project.properties')

          misc.rmTree(appDir)
          fs.mkdirSync(appDir)

          misc.makeDirectoryLink(app.sourcePath, sourceLink)
          misc.copy(sonarTemplate, sonarSettings)
          misc.replace('PROJECT_KEY', app.id, sonarSettings)
          misc.replace('PROJECT_NAME', app.name, sonarSettings)
          misc.replace('PROJECT_SOURCES', 'src', sonarSettings)

          local cmd = tostring(sonarRunner) .. " " .. tostring(appDir) .. " " .. tostring(settings.sonarRunnerPath)
          p('executing', cmd)
          local success, err = os.execute(cmd)
         */
        File sonarRunner = new File(settings.getSonarrunnerpath());
        File workDir = new File(settings.getWorkdir());
        File appWorkDir = new File(workDir, app.getId().toString() + "-static");
        File sourcePath = new File(app.getSourcePath());
        File sourceLink = new File(appWorkDir, "src");
        File sonarPropertiesTemplate = new File(workDir, "sonar-project.properties.template");
        File sonarSettings = new File(appWorkDir, "sonar-project.properties");

        if (!sonarRunner.exists()
                || !sonarRunner.isFile()
                || !sonarRunner.canExecute()) {
            return "Bad sonar runner script";
        }

        if (!workDir.exists()
                || !checkDirRights(workDir)) {
            return "Bad workdir";
        }

        if (appWorkDir.exists()) {
            if (!checkDirRights(appWorkDir)) {
                return "Bad application workdir";
            }
            clearFolder(appWorkDir);
        } else {
            if (!appWorkDir.mkdir()
                    || !checkDirRights(appWorkDir)) {
                return "Bad application workdir";
            }
        }

        if (!sourcePath.exists()
                || !sourcePath.isDirectory()
                || !sourcePath.canExecute()
                || !sourcePath.canRead()) {
            return "Bad application source path";
        }

        if (!fullPathToSources) {
            if (!sourceLink.exists()) {
                try {
                    Files.createSymbolicLink(sourceLink.toPath(), sourcePath.toPath());
                } catch (IOException e) {
                    try {
                        Files.createLink(sourceLink.toPath(), sourcePath.toPath());
                    } catch (IOException ex) {
                        String out = runShellCmd(appWorkDir, Arrays.asList("CMD", "/C",
                                "MKLINK",
                                "/J",
                                sourceLink.toString(),
                                sourcePath.toString()));
                        if (!sourceLink.exists()) {
                            return "Can't create link to source path \n" + out;
                        }
                    }
                }
            }
        }

        if (!sonarPropertiesTemplate.exists()
                || !sonarPropertiesTemplate.isFile()
                || !sonarPropertiesTemplate.canRead()) {
            String str = String.join(System.getProperty("line.separator"),
                    "# Required metadata",
                    "sonar.projectKey=PROJECT_KEY",
                    "sonar.projectName=PROJECT_NAME",
                    "sonar.projectVersion=1.0",
                    "",
                    "# Path to the parent source code directory.",
                    "# Path is relative to the sonar-project.properties file. Replace \"\\\" by \"/\" on Windows.",
                    "# Since SonarQube 4.2, this property is optional if sonar.modules is set.",
                    "# If not set, SonarQube starts looking for source code from the directory containing",
                    "# the sonar-project.properties file.",
                    "sonar.sources=PROJECT_SOURCES",
                    ""
            );
            try (FileWriter fw = new FileWriter(sonarPropertiesTemplate)) {
                fw.write(str);
            }
            catch (IOException iox) {
                return "Bad Sonar properties template";
            }
        }

        if (sonarSettings.exists()) {
            try {
                Files.deleteIfExists(sonarSettings.toPath());
            } catch (IOException e) {
                return e.getMessage();
            }
        }
        if (!sonarSettings.exists()) {
            try {
                Files.copy(sonarPropertiesTemplate.toPath(), sonarSettings.toPath());

                FileInputStream in = new FileInputStream(sonarSettings);
                Properties props = new Properties();
                props.load(in);
                in.close();

                props.setProperty("sonar.projectKey", app.getId().toString());
                props.setProperty("sonar.projectName", app.getName());
                if (fullPathToSources) {
                    props.setProperty("sonar.sources", app.getSourcePath());
                }
                else {
                    props.setProperty("sonar.sources", "src");
                }

                FileOutputStream out = new FileOutputStream(sonarSettings);
                props.store(out, Instant.now().toString());
                out.close();
            } catch (IOException e) {
                return e.getMessage();
            }
        }
        if (!sonarSettings.exists()) {
            return "Can't find Sonar settings file";
        }

        /*
         INFO:
         INFO: usage: sonar-runner [options]
         INFO:
         INFO: Options:
         INFO:  -D,--define <arg>     Define property
         INFO:  -e,--errors           Produce execution error messages
         INFO:  -h,--help             Display help information
         INFO:  -v,--version          Display version information
         INFO:  -X,--debug            Produce execution debug output
         */
        String out = runShellCmd(appWorkDir,
                Arrays.asList("CMD", "/C",
                        sonarRunner.toString(),
                        "-Dsonar.host.url=http://" + settings.getSonarhost() + ":" + settings.getSonarport(),
                        "-Dsonar.login=" + settings.getSonarlogin(),
                        "-Dsonar.password=" + settings.getSonarpassword()));

        return out;
    }

    /*
    Creates a symbolic link.

    MKLINK [[/D] | [/H] | [/J]] Link Target

        /D      Creates a directory symbolic link.  Default is a file
                symbolic link.
        /H      Creates a hard link instead of a symbolic link.
        /J      Creates a Directory Junction.
        Link    Specifies the new symbolic link name.
        Target  Specifies the path (relative or absolute) that the new link
                refers to.
     */
    private String runShellCmd(File workdir, List<String> cmd) {
        ProcessBuilder pb = new ProcessBuilder(cmd);
        pb.directory(workdir);
        pb.redirectErrorStream(true);
        Map<String, String> env = pb.environment();
        env.put("JAVA_HOME", System.getProperty("java.home"));
        env.put("PATH", System.getProperty("java.home") + File.pathSeparator + "bin;" + System.getProperty("PATH"));

        Process process = null;
        try {
            process = pb.start();
        } catch (IOException e) {
            return e.getMessage();
        }

        String out = "";
        try {
            InputStreamReader isr = new InputStreamReader(process.getInputStream());
            BufferedReader inStreamReader = new BufferedReader(isr);
            for (String s = ""; s != null; ) {
                out = out + s;
                s = inStreamReader.readLine();
            }
            inStreamReader.close();
        } catch (IOException e) {
            return e.getMessage();
        }

        if (process.exitValue() != 0) {
            return out;
        }
        return null;
    }

    private boolean checkDirRights(File d) {
        return d.exists() && d.isDirectory() && d.canExecute() && d.canWrite();
    }

    private static boolean clearFolder(File folder) {
        File[] files = folder.listFiles();
        boolean result = true;

        if (files != null) { //some JVMs return null for empty dirs
            try {
                for (File f : files) {
                    if (f.isDirectory()) {
                        boolean isJunction = (f.toPath().compareTo(f.toPath().toRealPath()) != 0);
                        if (isJunction) {
                            Runtime rt = Runtime.getRuntime();
                            rt.exec(new String[]{"cmd.exe", "/c", "rmdir", f.toString()});
                        } else {
                            clearFolder(f);
                        }
                    } else {
                        Files.deleteIfExists(f.toPath());
                    }
                }
            } catch (IOException e) {
                result = false;
            }
        }
        return result;
    }

    public String fetchReport() {
        Map<String, String> params = Stream.of(new String[][]{
                {"pageSize", "-1"},
                {"componentRoots", app.getId().toString()},
                {"format", "json"}
        }).collect(Collectors.toMap(data -> data[0], data -> data[1]));

        try {
            Pair<Integer, String> response = SonarApi.httpRequest(settings,
                    app,
                    "GET",
                    "/api/issues/search",
                    params);
            String jsonString = response.getValue();
            if (jsonString != null) {
                JsonNode rootNode;
                ObjectMapper objectMapper;
                objectMapper = new ObjectMapper();
                rootNode = objectMapper.readTree(jsonString);
                JsonNode issues = rootNode.get("issues");
                List<CoverageStaticIssue> listIssues = new ArrayList<>();

                if (issues.isArray()) {
                    ArrayNode arrayNode = (ArrayNode) issues;
                    for (int i = 0; i < arrayNode.size(); i++) {
                        //map json to object
                        CoverageStaticIssue issue = objectMapper.convertValue(arrayNode.get(i), CoverageStaticIssue.class);
                        UUID appid = UUID.fromString(arrayNode.get(i).get("project").textValue());
                        String source = arrayNode.get(i).get("component").textValue()
                                .replaceFirst("^" + appid.toString(), "")
                                .replaceFirst("^:", "")
                                .replaceFirst("^src/", "")
                                .replaceFirst("^src\\\\", "");
                        String pakkage = Paths.get(source).getParent().toString()
                                .replace("\\", "/");
                        source = Paths.get(source).getFileName().toString();

                        issue.setAppid(appid);
                        issue.setSource(source);
                        issue.setPakkage(pakkage);
                        listIssues.add(issue);
                    }
                    coverageStaticIssueService.addCoverageStaticAllIssues(listIssues);
                }
            }
            return null;
        } catch (IOException e) {
            return e.getMessage();
        }
    }

}

