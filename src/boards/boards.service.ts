import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository,
    ){}

    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }
    // private boards: Board[] = []; //private 사용하는 이유는 클래스 내에서만 접근해서 수정 가능하게 하려고.

    // getAllBoards(): Board[]{ //리턴값 타입지정
    //     return this.boards;
    // }
    // createBoard(createBoardDto: CreateBoardDto) {
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         id : uuid(),
    //         title : title,
    //         description: description,
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }
    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);
    //     if(!found){
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }
    //     return found;
    // }
    // deleteBoard(id: string): void{
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id)
    // }
    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
