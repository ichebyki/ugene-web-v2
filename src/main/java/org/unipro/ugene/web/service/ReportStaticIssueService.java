package org.unipro.ugene.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.unipro.ugene.web.model.ReportStaticIssue;
import org.unipro.ugene.web.repository.ReportStaticIssueRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service("reportStaticIssueService")
public class ReportStaticIssueService {
    @Autowired
    private ReportStaticIssueRepository reportStaticIssueRepository;

    public List<ReportStaticIssue> getAllStaticIssues() {
        return reportStaticIssueRepository.findAll();
    }

    public boolean addReportStaticIssue(ReportStaticIssue issue) {
        ReportStaticIssue save = reportStaticIssueRepository.save(issue);
        return save != null;
    }

    public boolean addReportStaticAllIssues(List<ReportStaticIssue> issues) {
        List<ReportStaticIssue> save = reportStaticIssueRepository.saveAll(issues);
        return save != null && save.size() == issues.size();
    }

    public List<String> getAllPakkagesByAppid(String appid) {
        return getAllPakkagesByAppid(UUID.fromString(appid));
    }

    public List<String> getAllPakkagesByAppid(UUID appid) {
        return reportStaticIssueRepository.getDistinctPakkageByAppidAsc(appid);
    }

    public List<String> getAllClassesByAppidAndPakkage(UUID appid, String pakkage) {
        if (pakkage == null) {
            return reportStaticIssueRepository.getDistinctClassesByAppidAsc(appid);
        }
        return reportStaticIssueRepository.getDistinctClassesByAppidAndPakkageAsc(appid, pakkage);
    }

    public List<ReportStaticIssue> getIssuesByAppidAndPakkageAndClass(UUID appid, String pakkage, String source) {
        if (appid == null || pakkage == null || source == null) {
            return new ArrayList<>();
        }
        return reportStaticIssueRepository.getDistinctByAppidAndPakkageAndSourceOrderByLineAsc(appid, pakkage, source);
    }

}
