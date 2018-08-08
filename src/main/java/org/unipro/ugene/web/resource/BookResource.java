package org.unipro.ugene.web.resource;

import org.unipro.ugene.web.model.Book;
import org.unipro.ugene.web.service.BookService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class BookResource {

    @Autowired
    BookService bookService;

    @RequestMapping(path = "/allbooks", method = GET)
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @RequestMapping(path = "/addbook", method = POST)
    public List<Book> addBook(@RequestBody Book book) {
        log.info("Book Add request {}", book);
        bookService.addBook(book);

        return bookService.getAllBooks();
    }

}
