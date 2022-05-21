import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
@Injectable()
export class BoardsService {
    private boards: Board[] = []; //private 사용하는 이유는 클래스 내에서만 접근해서 수정 가능하게 하려고.

    getAllBoards(): Board[]{ //리턴값 타입지정
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const { title, description } = createBoardDto;
        const board: Board = {
            id : uuid(),
            title : title,
            description: description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }
}
