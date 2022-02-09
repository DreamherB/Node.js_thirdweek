class Site {
    constructor() {
        this.boards = [];
        // this.id = Math.random().floor()
    }

    addBoard(board) {
        // 왜 클래스 내부에선 function을 안 붙일까? -> ES6 에서 부터 객체 내 함수 선언 시 생략가능한듯, 근데 function 붙이면 에러발생?

        if (this.boards.length === 0) {
            this.boards.push(board); // Site { boards: [ Board { name: '공지사항' } ] }
            this.boards[0].names.push(board.name);
        } else {
            for (let i = 0; i < this.boards.length; i++) {
                if (this.boards[i].name === board.name) {
                    // this.boards.filter(x => x.name === board.name) 도 있음
                    // this.boards.map(x => x.name).includes(board.name) 도 있음
                    throw this.addBoard(board);
                } else {
                    return (
                        this.boards.push(board), //  여기서 만약 return이 없으면 무한루프가 발생한다.
                        this.boards[i].names.push(board.name)
                    );
                }
            }
        }
    }

    findBoardByName(name) {
        if (this.boards.filter((x) => x.name === name)) {
            // this.boards라는 배열 내부의 객체 값 중 name키의 값이 에서 외부에서 받아온 name 값과 같은 경우의 객체만 새로운 배열로 반환해준다.

            return this.boards.filter((x) => x.name === name)[0];
            // 위의 결과물이 Expected: {"articles": [], "name": "공지사항", "names": ["공지사항"]}
            //Received: [{"articles": [], "name": "공지사항", "names": ["공지사항"]}]이므로 여기서 [0]를 사용해 []를 한번 벗겨준다.
        }
    }
}

class Board {
    constructor(name) {
        // super(); // 부모 생성자, 이것을 만들어주어야 자식 생성자 this도 만들 수 있다.
        if (name === '' || name === null) {
            throw Error;
        } else {
            this.name = name; // Board {name: '공지사항'}
            this.names = [];
            this.articles = []; // 왜 만들까? 이렇게되면 Site { boards: [ Board { name: '공지사항', articles: [] } ] } 이런느낌이려나?
            // this.siteId = -1
        }
    }
    publish(article) {
        if (this.names.includes(this.name)) {
            this.articles.push(article);
            article.id = this.name + '-' + Math.random() * (10000000000).toString(10).substr(0, 10); // 랜덤 id 생성
            article.createdDate = new Date().toISOString(); // ISO 8601 양식
        } else {
            throw Error;
        }
    }
    getAllArticles() {
        return this.articles;
    }
}

class Article {
    constructor({ subject, content, author }) {
        if (
            subject === null ||
            subject === '' ||
            content === null ||
            content === '' ||
            author === null ||
            author === ''
        ) {
            throw Error;
        } else {
            this.subject = subject;
            this.content = content;
            this.author = author;
            this.id = 0;
            this.createdDate = '';
            this.comments = [];
        }
    }
    reply(comment) {
        if (this.id) {
            this.comments.push(comment);
            comment.createdDate = new Date().toISOString(); // ISO 8601 양식
        } else {
            throw Error;
        }
    }
    getAllComments() {
        console.log(this);
        console.log(this.comments);
        return this.comments;
    }
}

class Comment {
    constructor({ content, author }) {
        if (content === null || content === '' || author === null || author === '') {
            throw Error;
        } else {
            this.content = content;
            this.author = author;
        }
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
