/// This file defines the implementation of the [ChatRepository] interface.
///
/// The [ChatRepositoryImpl] class is responsible for orchestrating the communication
/// between the application's use cases and the remote data source, and it handles
/// any potential exceptions that might occur during this process.

import 'package:dartz/dartz.dart';
import 'package:hakim_hub_mobile/core/error/exception.dart';
import 'package:hakim_hub_mobile/core/error/failures.dart';
import 'package:hakim_hub_mobile/features/chatbot/data/datasources/chat_remote_data_soure.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_request_entity.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_response_entity.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/repositories/chat_repository.dart';

/// An implementation of the [ChatRepository] interface.
class ChatRepositoryImpl implements ChatRepository {
  final ChatRemoteDataSource remoteDataSource;

  /// Constructs a [ChatRepositoryImpl] instance with a [ChatRemoteDataSource].
  ChatRepositoryImpl({required this.remoteDataSource});

  /// Retrieves a chatbot response using the provided [ChatRequest].
  ///
  /// It delegates the request to the [ChatRemoteDataSource] to retrieve the response.
  /// Returns an [Either] containing either a [Failure] or a [ChatResponse].
  /// Throws a [ServerFailure] if there's a server-related error.
  @override
  Future<Either<Failure, ChatResponse>> getChatResponse(ChatRequest request) async {
    try {
      final response = await remoteDataSource.getResponse(request);
      return Right(response);
    } on ServerException {
      return Left(ServerFailure());
    }
  }
}
