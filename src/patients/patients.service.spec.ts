// import { getModelToken } from '@nestjs/mongoose';
// import { Test, TestingModule } from '@nestjs/testing';
// import MockResponse from '../mock.response';
// import { AccountService } from './accounts.service';
// import { CreateAccountsDto } from './dto/create-accounts.dto';

// describe('AccountService', () => {
//   let service: AccountService;
//   // const responseMockAccount200 = MockResponse.mockAccountStatus200();

//   const paramsCreateAccountDto = new CreateAccountsDto();
//   paramsCreateAccountDto.email = 'teste@teste.com';
//   paramsCreateAccountDto.name = 'teste';
//   paramsCreateAccountDto.password = 'teste';

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AccountService],
//       providers: [
//         {
//           provide: getModelToken('Account'),
//           useValue: mockAccountModel(paramsCreateAccountDto),
//         },
//       ],
//     }).compile();
//     function mockAccountModel(dto: any) {
//       this.data = dto;
//       this.save = () => {
//         return this.data;
//       };
//     }
//     service = module.get<AccountService>(AccountService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should create an account', async () => {
//     const createAccountResponse = await service.create(paramsCreateAccountDto);

//     // expect(createAccountResponse.message).toMatch(
//     //   responseMockAccount200.message,
//     // );
//   });
// });
