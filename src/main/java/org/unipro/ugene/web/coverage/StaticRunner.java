package org.unipro.ugene.web.coverage;

import org.unipro.ugene.web.model.AppSettings;
import org.unipro.ugene.web.model.UserSettings;

import java.io.*;
import java.nio.file.Files;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

public class StaticRunner {

    private final UserSettings settings;
    private final AppSettings app;

    public StaticRunner(UserSettings settings, AppSettings app) {
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

        boolean fullPathToSources = true;
        if (!fullPathToSources || !sourceLink.exists()) {
            try {
                Files.createSymbolicLink(sourceLink.toPath(), sourcePath.toPath());
            } catch (IOException e) {
                try {
                    Files.createLink(sourceLink.toPath(), sourcePath.toPath());
                } catch (IOException ex) {
                    String out = runMkLink(sourceLink, sourcePath);
                    if (!sourceLink.exists()) {
                        return "Can't create link to source path \n" + out;
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
                Files.copy(sonarPropertiesTemplate.toPath(), sonarSettings.toPath());

                FileInputStream in = new FileInputStream(sonarSettings);
                Properties props = new Properties();
                props.load(in);
                in.close();

                props.setProperty("PROJECT_KEY", app.getId().toString());
                props.setProperty("PROJECT_NAME", app.getName());
                if (fullPathToSources) {
                    props.setProperty("PROJECT_SOURCES", app.getSourcePath());
                }
                else {
                    props.setProperty("PROJECT_SOURCES", "src");
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

        return null;
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
    private String runMkLink(File sourceLink, File sourcePath) {
        List<String> cmd = Arrays.asList("CMD", "/C",
                "MKLINK",
                "/D",
                sourceLink.toString(),
                sourcePath.toString());
        ProcessBuilder pb = new ProcessBuilder(cmd);
        pb.redirectErrorStream(true);
        Process process = null;
        try {
            process = pb.start();
        } catch (IOException e) {
            return e.getMessage();
        }
        BufferedReader inStreamReader = new BufferedReader(
                new InputStreamReader(process.getInputStream()));

        String out = "";
        for (String s = ""; s != null; ) {
            out = out + s;
            try {
                s = inStreamReader.readLine();
            } catch (IOException e) {
                return e.getMessage();
            }
        }
        return out;
    }

    private boolean checkDirRights(File d) {
        return d.exists() && d.isDirectory() && d.canExecute() && d.canWrite();
    }

    private static boolean clearFolder(File folder) {
        File[] files = folder.listFiles();
        boolean result = true;

        if (files != null) { //some JVMs return null for empty dirs
            for (File f : files) {
                if (f.isDirectory()) {
                    clearFolder(f);
                } else {
                    try {
                        Files.deleteIfExists(f.toPath());
                    } catch (IOException e) {
                        result = false;
                        break;
                    }
                }
            }
        }
        return result;
    }
}
