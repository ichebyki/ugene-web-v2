package org.unipro.ugene.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.unipro.ugene.web.model.CoverageStaticIssue;
import org.unipro.ugene.web.repository.CoverageStaticIssueRepository;

import java.util.List;

@Service("coverageStaticIssueService")
public class CoverageStaticIssueService {
    @Autowired
    private CoverageStaticIssueRepository coverageStaticIssueRepository;

    public List<CoverageStaticIssue> getAllUserSettings() {
        return coverageStaticIssueRepository.findAll();
    }

    public boolean addCoverageStaticIssue(CoverageStaticIssue issue) {
        CoverageStaticIssue save = coverageStaticIssueRepository.save(issue);
        return save != null;
    }

    public boolean addCoverageStaticAllIssues(List<CoverageStaticIssue> issues) {
        List<CoverageStaticIssue> save = coverageStaticIssueRepository.saveAll(issues);
        return save != null && save.size() == issues.size();
    }

    public List<CoverageStaticIssue> getAllCoverageStaticIssueByPakkage(String pakkage) {
        return coverageStaticIssueRepository.findAllByPakkage(pakkage);
    }

    public List<CoverageStaticIssue> getAllCoverageStaticIssueBySource(String source) {
        return coverageStaticIssueRepository.findAllBySource(source);
    }

    public CoverageStaticIssue updateCoverageStaticIssue(CoverageStaticIssue issue) {
        return coverageStaticIssueRepository.saveAndFlush(issue);
    }
}
