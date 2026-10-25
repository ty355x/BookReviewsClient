import { FeedbackFilter } from "./feedback-filter";

export class FeedbackList {
    nonReviewedItemCount = 0;
    filter: FeedbackFilter;

    private user: any = null;

    constructor(user: any) {
        this.user = user;
        this.filter = new FeedbackFilter(this.user);
    }

    setItemsFromBookList(books: any) {
        const bookList = this.makeBookList(books);
        const itemsList = this.makeItemsList(bookList);
        const usersList = this.makeUserList(itemsList);
        this.filter.setItems(bookList, itemsList, usersList);
        this.countNonReviewedItems();
    }

    clear() {
        this.filter.setItems([], [], []);
        this.nonReviewedItemCount = 0;
    }

    countNonReviewedItems() {
        this.nonReviewedItemCount = 0;

        if (this.filter.items.length === 0) {
            return;
        }

        for (const feedback of this.filter.items) {
            if (this.user.role === 'author' && feedback.user.id !== this.user.id && feedback.reviewed === 0) {
                this.nonReviewedItemCount++;
            }

            for (const response of feedback.responses) {
                if (response.user.id !== this.user.id && response.reviewed === 0) {
                    this.nonReviewedItemCount++;
                }
            }
        }
    }

    private makeBookList(books: any[]) {
        const bookList = [];

        for (const book of books) {
            const existingBook = this.filter.books.find((b: any) => b.id === book.id);
            const showBook = existingBook && !existingBook.show ? false : true;
            const newBook: any = { id: book.id, title: book.title, chapters: [], show: showBook };
            bookList.push(newBook);

            for (const chapter of book.chapters) {
                const existingChapter = existingBook ? existingBook.chapters.find((c: any) => c.id === chapter.id) : null;
                const showChapter = existingChapter && !existingChapter.show ? false : true;
                const newChapter: any =({ id: chapter.id, title: chapter.title, feedback: [], show: showChapter });
                newBook.chapters.push(newChapter);

                if (chapter.content.length === 0) {
                    break;
                }

                for (const feedback of chapter.content[0].feedback) {
                    feedback.book = newBook;
                    feedback.chapter = newChapter;
                    newChapter.feedback.push(feedback);

                    for(const response of feedback.responses) {
                        response.current_user = response.user_id === this.user.id;
                    }
                }
            }
        }

        return bookList;
    }

    private makeItemsList(books: any[]) {
        const items: any[] = [];

        for (const book of books) {
            for (const chapter of book.chapters) {
                for (const feedback of chapter.feedback) {
                    items.push(feedback);
                }
            }
        }

        return items;
    }

    private makeUserList(items: any[]) {
        const userMap = new Map();

        for (const feedback of items) {
            if (feedback.user.id !== this.user.id && !userMap.has(feedback.user.id)) {
                const existingUser = this.filter.users.find((user: any) => user.id === feedback.user.id);
                const showUser = existingUser && !existingUser.show ? false : true;
                userMap.set(feedback.user.id, { id: feedback.user.id, name: feedback.user.name, show: showUser });
            }
        }

        const users: any[] = [];
        userMap.forEach((user: any) => users.push(user));
        users.sort((a: any, b: any) => a.name.localeCompare(b.name));

        return users;
    }
}
