package com.operr.todo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TodoItem.
 */
@Entity
@Table(name = "todo_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TodoItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "event_time", nullable = false)
    private Instant eventTime;

    @NotNull
    @Size(max = 100)
    @Column(name = "todo_title", length = 100, nullable = false)
    private String todoTitle;

    @NotNull
    @Size(max = 1000)
    @Column(name = "todo_desc", length = 1000, nullable = false)
    private String todoDesc;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getEventTime() {
        return eventTime;
    }

    public TodoItem eventTime(Instant eventTime) {
        this.eventTime = eventTime;
        return this;
    }

    public void setEventTime(Instant eventTime) {
        this.eventTime = eventTime;
    }

    public String getTodoTitle() {
        return todoTitle;
    }

    public TodoItem todoTitle(String todoTitle) {
        this.todoTitle = todoTitle;
        return this;
    }

    public void setTodoTitle(String todoTitle) {
        this.todoTitle = todoTitle;
    }

    public String getTodoDesc() {
        return todoDesc;
    }

    public TodoItem todoDesc(String todoDesc) {
        this.todoDesc = todoDesc;
        return this;
    }

    public void setTodoDesc(String todoDesc) {
        this.todoDesc = todoDesc;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TodoItem todoItem = (TodoItem) o;
        if (todoItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), todoItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TodoItem{" +
            "id=" + getId() +
            ", eventTime='" + getEventTime() + "'" +
            ", todoTitle='" + getTodoTitle() + "'" +
            ", todoDesc='" + getTodoDesc() + "'" +
            "}";
    }
}
