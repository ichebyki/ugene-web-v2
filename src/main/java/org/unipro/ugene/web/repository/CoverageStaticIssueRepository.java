package org.unipro.ugene.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unipro.ugene.web.model.CoverageStaticIssue;

import java.util.List;

public interface CoverageStaticIssueRepository extends JpaRepository<CoverageStaticIssue, Long> {
    List<CoverageStaticIssue> findAllBySource(String source);
    List<CoverageStaticIssue> findAllByPakkage(String pakkage);
}