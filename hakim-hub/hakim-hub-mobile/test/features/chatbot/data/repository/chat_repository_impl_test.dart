import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/core/error/exception.dart';
import 'package:hakim_hub_mobile/core/error/failures.dart';
import 'package:hakim_hub_mobile/features/chatbot/data/datasources/chat_remote_data_soure.dart';
import 'package:hakim_hub_mobile/features/chatbot/data/models/chat_response_model.dart';
import 'package:hakim_hub_mobile/features/chatbot/data/repositories/chat_repository_impl.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_request_entity.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'chat_repository_impl_test.mocks.dart';

@GenerateMocks([ChatRemoteDataSource])
void main() {
  late ChatRepositoryImpl repository;
  late MockChatRemoteDataSource mockRemoteDataSource;

  setUp(() {
    mockRemoteDataSource = MockChatRemoteDataSource();
    repository = ChatRepositoryImpl(remoteDataSource: mockRemoteDataSource);
  });

  group('getChatResponse', () {
    final chatRequest = ChatRequest(
        address: "Arada", isNew: true, message: 'I have headache');

    test(
        'should return ChatResponse when remote data source returns valid data',
        () async {
      // Arrange
      final chatResponseModel = ChatResponseModel(
        institutes: [],
        reply: "I'm sorry to hear that you're experiencing a headache, are you also experiencing any sharp pain along with it?",
        speciality: "Neurologiest",
      );

      when(mockRemoteDataSource.getResponse(chatRequest))
          .thenAnswer((_) async => chatResponseModel);

      // Act
      final result = await repository.getChatResponse(chatRequest);

      // Assert
      expect(result, equals(Right(chatResponseModel)));
      verify(mockRemoteDataSource.getResponse(chatRequest)).called(1);
      verifyNoMoreInteractions(mockRemoteDataSource);
    });

    test(
        'should return ServerFailure when remote data source throws ServerException',
        () async {
      // Arrange
      when(mockRemoteDataSource.getResponse(chatRequest))
          .thenThrow(ServerException());

      // Act
      final result = await repository.getChatResponse(chatRequest);

      // Assert
      expect(result, equals(Left(ServerFailure())));
      verify(mockRemoteDataSource.getResponse(chatRequest)).called(1);
      verifyNoMoreInteractions(mockRemoteDataSource);
    });
  });
}
