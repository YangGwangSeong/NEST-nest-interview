import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
    private boards = [{"이름":"test","나이":7}]; //private 사용하는 이유는 클래스 내에서만 접근해서 수정 가능하게 하려고.

    getAllBoards(){
        return this.boards;
    }
}
