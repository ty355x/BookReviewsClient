export class FeedbackFilter {
    items: any = [];

    showReviewed = true;
    showResponses = true;
    books: any = [];
    users: any = [];

    allItemsHidden = true;

    private user: any = null;

    constructor(user: any) {
        this.user = user;
    }

    setItems(books: any[], items: any[], users: any[]) {
        this.books = books;
        this.items = items;
        this.users = users;

        this.showAllFeedback();
        this.filterItems();
    }

    toggleShowReviewed() {
        this.showReviewed = !this.showReviewed;
        this.filterItems();
    }

    toggleShowResponses() {
        this.showResponses = !this.showResponses;
        this.filterItems();
    }

    toggleShowBook(bookId: number) {
        const book:any = this.books.find((b: any) => b.id === bookId);

        if (!book) {
            return;
        }

        book.show = !book.show;
        book.chapters.forEach((chapter: any) => chapter.show = book.show);
        this.filterItems();
    }

    toggleShowChapter(bookId: number, chapterId: number) {
        const book:any = this.books.find((b: any) => b.id === bookId);
        const chapter = book.chapters.find((b: any) => b.id === chapterId);

        if (chapter) {
            chapter.show = !chapter.show;
            this.filterItems();
        }

        book.show = book.chapters.find((chapter: any) => chapter.show) !== undefined;
    }

    toggleShowUser(userId: number) {
        const user = this.users.find((u: any) => u.id === userId);

        if (user) {
            user.show = !user.show;
            this.filterItems();
        }
    }

    filterItems() {
        if (this.user.role === 'reader') {
            return;
        }

        this.allItemsHidden = true;

        for (const feedback of this.items) {
            let showFeedback = true;

            if (!this.showReviewed && feedback.reviewed) {
                if (this.showResponses) {
                    showFeedback = this.hasNonReviewedResponses(feedback);
                } else {
                    showFeedback = false;
                }
            }

            if (showFeedback) {
                const feedbackUser = this.users.find((user: any) => user.id === feedback.user.id);
                showFeedback = feedbackUser.show;
            }

            if (showFeedback) {
                const feedbackBook = this.books.find((book: any) => book.id === feedback.book.id);
                const feedbackChapter = feedbackBook.chapters.find((chapter: any) => chapter.id === feedback.chapter.id);
                showFeedback = feedbackChapter.show;
            }

            feedback.show = showFeedback;

            if (showFeedback) {
                this.allItemsHidden = false;
            }
        }
    }

    private hasNonReviewedResponses(feedback: any) {
        let nonReviewedResponseFound = false;

        for (const response of feedback.responses) {
            if (!response.reviewed && response.user.id !== this.user.id) {
                nonReviewedResponseFound = true;
            }
        }

        return nonReviewedResponseFound;
    }

    private showAllFeedback() {
        this.items.forEach((feedback: any) => feedback.show = true);
        this.allItemsHidden = false;
    }
}
