package com.example.backend_lms.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class TimeAuditable {
    @CreatedDate
    @Temporal(TemporalType.DATE)
    @Column(updatable = false)
    private Date createdAt;

    @LastModifiedDate
    @Temporal(TemporalType.DATE)
    private Date updatedAt;
}
