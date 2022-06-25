import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {

    //Inject Repository to Service
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}

    createBoard(createBoardDto: CreateBoardDto, user: User) : Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getAllBoards(
        user: User,
    ): Promise <Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', { userId: user.id})
        const boards = await query.getMany();
        return boards;
    }

    async getAllBoardsFree(): Promise <Board[]>{
        
        return this.boardRepository.find();
    }

    async getBoardById(
        id: number,
        user: User
        ): Promise <Board> {
        //const found = await this.boardRepository.findOne(id);
        const found = await this.boardRepository.findOne({ where: { id:id, userId: user.id }});
        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }
    async deleteBoard(id:number, user: User): Promise<void> {
        const result = await this.boardRepository.delete({id, user});
        
        //affected가 0이면 존재하는 아이템이 없을때
        if(result.affected ===0) {
            throw new NotFoundException(`Cant't find Board with id ${id}`);
        }
    }

    async updateBoardStatus(
        id: number,
        status: BoardStatus,
        user: User): Promise<Board> {
        const board = await this.getBoardById(id,user);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
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
