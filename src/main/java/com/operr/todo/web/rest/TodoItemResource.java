package com.operr.todo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.operr.todo.domain.TodoItem;
import com.operr.todo.repository.TodoItemRepository;
import com.operr.todo.web.rest.errors.BadRequestAlertException;
import com.operr.todo.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TodoItem.
 */
@RestController
@RequestMapping("/api")
public class TodoItemResource {

    private final Logger log = LoggerFactory.getLogger(TodoItemResource.class);

    private static final String ENTITY_NAME = "todoItem";

    private final TodoItemRepository todoItemRepository;

    public TodoItemResource(TodoItemRepository todoItemRepository) {
        this.todoItemRepository = todoItemRepository;
    }

    /**
     * POST  /todo-items : Create a new todoItem.
     *
     * @param todoItem the todoItem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new todoItem, or with status 400 (Bad Request) if the todoItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/todo-items")
    @Timed
    public ResponseEntity<TodoItem> createTodoItem(@Valid @RequestBody TodoItem todoItem) throws URISyntaxException {
        log.debug("REST request to save TodoItem : {}", todoItem);
        if (todoItem.getId() != null) {
            throw new BadRequestAlertException("A new todoItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TodoItem result = todoItemRepository.save(todoItem);
        return ResponseEntity.created(new URI("/api/todo-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }


    /**
     * PUT  /todo-items : Updates an existing todoItem.
     *
     * @param todoItem the todoItem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated todoItem,
     * or with status 400 (Bad Request) if the todoItem is not valid,
     * or with status 500 (Internal Server Error) if the todoItem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/todo-items")
    @Timed
    public ResponseEntity<TodoItem> updateTodoItem(@Valid @RequestBody TodoItem todoItem) throws URISyntaxException {
        log.debug("REST request to update TodoItem : {}", todoItem);
        if (todoItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TodoItem result = todoItemRepository.save(todoItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, todoItem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /todo-items : get all the todoItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of todoItems in body
     */
    @GetMapping("/todo-items")
    @Timed
    public List<TodoItem> getAllTodoItems() {
        log.debug("REST request to get all TodoItems");
        return todoItemRepository.findAll();
    }

    /**
     * GET  /todo-items/:id : get the "id" todoItem.
     *
     * @param id the id of the todoItem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the todoItem, or with status 404 (Not Found)
     */
    @GetMapping("/todo-items/{id}")
    @Timed
    public ResponseEntity<TodoItem> getTodoItem(@PathVariable Long id) {
        log.debug("REST request to get TodoItem : {}", id);
        Optional<TodoItem> todoItem = todoItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(todoItem);
    }

    /**
     * DELETE  /todo-items/:id : delete the "id" todoItem.
     *
     * @param id the id of the todoItem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/todo-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteTodoItem(@PathVariable Long id) {
        log.debug("REST request to delete TodoItem : {}", id);

        todoItemRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @PostMapping("/todo-items/delete-multiple")
    @Timed
    public ResponseEntity<TodoItem> deleteTodoItems(@Valid @RequestBody Iterable<Long> ids) throws URISyntaxException {
        log.debug("request to delete multiple TodoItems");

        List<TodoItem> result = todoItemRepository.findAllById(ids);
        todoItemRepository.deleteAll(result);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, "")).build();
    }

}
