package com.operr.todo.web.rest;

import com.operr.todo.OperrApp;

import com.operr.todo.domain.TodoItem;
import com.operr.todo.repository.TodoItemRepository;
import com.operr.todo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.operr.todo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TodoItemResource REST controller.
 *
 * @see TodoItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OperrApp.class)
public class TodoItemResourceIntTest {

    private static final Instant DEFAULT_EVENT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EVENT_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_TODO_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TODO_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_TODO_DESC = "AAAAAAAAAA";
    private static final String UPDATED_TODO_DESC = "BBBBBBBBBB";

    @Autowired
    private TodoItemRepository todoItemRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTodoItemMockMvc;

    private TodoItem todoItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TodoItemResource todoItemResource = new TodoItemResource(todoItemRepository);
        this.restTodoItemMockMvc = MockMvcBuilders.standaloneSetup(todoItemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TodoItem createEntity(EntityManager em) {
        TodoItem todoItem = new TodoItem()
            .eventTime(DEFAULT_EVENT_TIME)
            .todoTitle(DEFAULT_TODO_TITLE)
            .todoDesc(DEFAULT_TODO_DESC);
        return todoItem;
    }

    @Before
    public void initTest() {
        todoItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createTodoItem() throws Exception {
        int databaseSizeBeforeCreate = todoItemRepository.findAll().size();

        // Create the TodoItem
        restTodoItemMockMvc.perform(post("/api/todo-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(todoItem)))
            .andExpect(status().isCreated());

        // Validate the TodoItem in the database
        List<TodoItem> todoItemList = todoItemRepository.findAll();
        assertThat(todoItemList).hasSize(databaseSizeBeforeCreate + 1);
        TodoItem testTodoItem = todoItemList.get(todoItemList.size() - 1);
        assertThat(testTodoItem.getEventTime()).isEqualTo(DEFAULT_EVENT_TIME);
        assertThat(testTodoItem.getTodoTitle()).isEqualTo(DEFAULT_TODO_TITLE);
        assertThat(testTodoItem.getTodoDesc()).isEqualTo(DEFAULT_TODO_DESC);
    }

    @Test
    @Transactional
    public void createTodoItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = todoItemRepository.findAll().size();

        // Create the TodoItem with an existing ID
        todoItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTodoItemMockMvc.perform(post("/api/todo-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(todoItem)))
            .andExpect(status().isBadRequest());

        // Validate the TodoItem in the database
        List<TodoItem> todoItemList = todoItemRepository.findAll();
        assertThat(todoItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkEventTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = todoItemRepository.findAll().size();
        // set the field null
        todoItem.setEventTime(null);

        // Create the TodoItem, which fails.

        restTodoItemMockMvc.perform(post("/api/todo-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(todoItem)))
            .andExpect(status().isBadRequest());

        List<TodoItem> todoItemList = todoItemRepository.findAll();
        assertThat(todoItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTodoTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = todoItemRepository.findAll().size();
        // set the field null
        todoItem.setTodoTitle(null);

        // Create the TodoItem, which fails.

        restTodoItemMockMvc.perform(post("/api/todo-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(todoItem)))
            .andExpect(status().isBadRequest());

        List<TodoItem> todoItemList = todoItemRepository.findAll();
        assertThat(todoItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTodoDescIsRequired() throws Exception {
        int databaseSizeBeforeTest = todoItemRepository.findAll().size();
        // set the field null
        todoItem.setTodoDesc(null);

        // Create the TodoItem, which fails.

        restTodoItemMockMvc.perform(post("/api/todo-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(todoItem)))
            .andExpect(status().isBadRequest());

        List<TodoItem> todoItemList = todoItemRepository.findAll();
        assertThat(todoItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTodoItems() throws Exception {
        // Initialize the database
        todoItemRepository.saveAndFlush(todoItem);

        // Get all the todoItemList
        restTodoItemMockMvc.perform(get("/api/todo-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(todoItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].eventTime").value(hasItem(DEFAULT_EVENT_TIME.toString())))
            .andExpect(jsonPath("$.[*].todoTitle").value(hasItem(DEFAULT_TODO_TITLE.toString())))
            .andExpect(jsonPath("$.[*].todoDesc").value(hasItem(DEFAULT_TODO_DESC.toString())));
    }
    
    @Test
    @Transactional
    public void getTodoItem() throws Exception {
        // Initialize the database
        todoItemRepository.saveAndFlush(todoItem);

        // Get the todoItem
        restTodoItemMockMvc.perform(get("/api/todo-items/{id}", todoItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(todoItem.getId().intValue()))
            .andExpect(jsonPath("$.eventTime").value(DEFAULT_EVENT_TIME.toString()))
            .andExpect(jsonPath("$.todoTitle").value(DEFAULT_TODO_TITLE.toString()))
            .andExpect(jsonPath("$.todoDesc").value(DEFAULT_TODO_DESC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTodoItem() throws Exception {
        // Get the todoItem
        restTodoItemMockMvc.perform(get("/api/todo-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTodoItem() throws Exception {
        // Initialize the database
        todoItemRepository.saveAndFlush(todoItem);

        int databaseSizeBeforeUpdate = todoItemRepository.findAll().size();

        // Update the todoItem
        TodoItem updatedTodoItem = todoItemRepository.findById(todoItem.getId()).get();
        // Disconnect from session so that the updates on updatedTodoItem are not directly saved in db
        em.detach(updatedTodoItem);
        updatedTodoItem
            .eventTime(UPDATED_EVENT_TIME)
            .todoTitle(UPDATED_TODO_TITLE)
            .todoDesc(UPDATED_TODO_DESC);

        restTodoItemMockMvc.perform(put("/api/todo-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTodoItem)))
            .andExpect(status().isOk());

        // Validate the TodoItem in the database
        List<TodoItem> todoItemList = todoItemRepository.findAll();
        assertThat(todoItemList).hasSize(databaseSizeBeforeUpdate);
        TodoItem testTodoItem = todoItemList.get(todoItemList.size() - 1);
        assertThat(testTodoItem.getEventTime()).isEqualTo(UPDATED_EVENT_TIME);
        assertThat(testTodoItem.getTodoTitle()).isEqualTo(UPDATED_TODO_TITLE);
        assertThat(testTodoItem.getTodoDesc()).isEqualTo(UPDATED_TODO_DESC);
    }

    @Test
    @Transactional
    public void updateNonExistingTodoItem() throws Exception {
        int databaseSizeBeforeUpdate = todoItemRepository.findAll().size();

        // Create the TodoItem

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTodoItemMockMvc.perform(put("/api/todo-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(todoItem)))
            .andExpect(status().isBadRequest());

        // Validate the TodoItem in the database
        List<TodoItem> todoItemList = todoItemRepository.findAll();
        assertThat(todoItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTodoItem() throws Exception {
        // Initialize the database
        todoItemRepository.saveAndFlush(todoItem);

        int databaseSizeBeforeDelete = todoItemRepository.findAll().size();

        // Get the todoItem
        restTodoItemMockMvc.perform(delete("/api/todo-items/{id}", todoItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TodoItem> todoItemList = todoItemRepository.findAll();
        assertThat(todoItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TodoItem.class);
        TodoItem todoItem1 = new TodoItem();
        todoItem1.setId(1L);
        TodoItem todoItem2 = new TodoItem();
        todoItem2.setId(todoItem1.getId());
        assertThat(todoItem1).isEqualTo(todoItem2);
        todoItem2.setId(2L);
        assertThat(todoItem1).isNotEqualTo(todoItem2);
        todoItem1.setId(null);
        assertThat(todoItem1).isNotEqualTo(todoItem2);
    }
}
