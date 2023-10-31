import 'package:hakim_hub_mobile/features/chatbot/domain/repositories/chat_repository.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/usecases/get_chat_response.dart';
import 'package:dartz/dartz.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_request_entity.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_response_entity.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import 'chat_institute_test.mocks.dart';
import 'get_chat_response_test.mocks.dart';

@GenerateMocks([ChatRepository])

// Import your mock classes here

void main() {
  late GetChatResponse useCase;
  late MockChatRepository mockChatRepository;

  setUp(() {
    // Create mock instances for the repository and use case
    mockChatRepository = MockChatRepository();
    useCase = GetChatResponse(repository: mockChatRepository);
  });

  group('GetChatResponse', () {
    // Define your test cases here
    test('should get ChatResponse from repository', () async {
      // Arrange
      final chatRequest = ChatRequest(
          address: "Arada", isNew: true, message: 'I have a headache');
      final expectedChatResponse = ChatResponse(
        institutes: [MockChatInstituteEntity()],
        reply: "I feel sorry to hear that. Is it a sharp pain?",
        speciality: "Neurologist",
      );

      // Mock the repository call
      when(mockChatRepository.getChatResponse(any)).thenAnswer(
        (_) async => Right(expectedChatResponse),
      );

      // Act
      final result = await useCase(chatRequest);

      // Assert
      expect(result, Right(expectedChatResponse));
      verify(mockChatRepository.getChatResponse(chatRequest)).called(1);
      verifyNoMoreInteractions(mockChatRepository);
    });

    // Add more test cases as needed...
  });
}
