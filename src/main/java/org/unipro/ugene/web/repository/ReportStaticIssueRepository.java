package org.unipro.ugene.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.unipro.ugene.web.model.ReportStaticIssue;

import java.util.List;
import java.util.UUID;

public interface ReportStaticIssueRepository extends JpaRepository<ReportStaticIssue, Long> {

    @Query("SELECT DISTINCT u.pakkage FROM ReportStaticIssue u WHERE u.appid IS ?1 ORDER BY u.pakkage ASC")
    List<String> getDistinctPakkageByAppidAsc(UUID appid);

    @Query("SELECT DISTINCT u.source FROM ReportStaticIssue u WHERE u.appid IS ?1 AND u.pakkage LIKE ?2 ORDER BY u.source ASC")
    List<String> getDistinctClassesByAppidAndPakkageAsc(UUID appid, String pakkage);

    @Query("SELECT DISTINCT u.source FROM ReportStaticIssue u WHERE u.appid IS ?1 ORDER BY u.source ASC")
    List<String> getDistinctClassesByAppidAsc(UUID appid);

    List<ReportStaticIssue> getDistinctByAppidAndPakkageAndSourceOrderByLineAsc(UUID appid, String pakkage, String source);

    Long deleteByAppid(UUID appid);

    @Modifying
    @Query("delete from ReportStaticIssue u where u.appid = ?1")
    void deleteInBulkByAppid(UUID appid);



}