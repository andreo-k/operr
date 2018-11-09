package com.operr.todo.repository;

import com.operr.todo.domain.TodoItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TodoItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {

}
