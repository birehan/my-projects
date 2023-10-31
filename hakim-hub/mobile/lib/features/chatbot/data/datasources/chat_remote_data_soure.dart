/// This file contains the implementation of the [ChatRemoteDataSource] interface,
/// which is responsible for making remote API calls to a chatbot service.
/// The [ChatRemoteDataSourceImpl] class uses the `http` package to send a POST
/// request to a chatbot API and retrieve a response. It takes a [http.Client]
/// as a dependency for making HTTP requests. The base URL for the API is determined
/// using the [getBaseUrl] function from the `core/utils/base_url.dart` file.
///
/// The class implements the [ChatRemoteDataSource] interface, providing a method
/// to send a chat request and receive a chatbot response.

import 'dart:convert';
import 'dart:io';

import 'package:hakim_hub_mobile/core/error/exception.dart';
import 'package:hakim_hub_mobile/features/chatbot/data/models/chat_request_model.dart';
import 'package:http/http.dart' as http;

import 'package:hakim_hub_mobile/features/chatbot/data/models/chat_response_model.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_request_entity.dart';

import '../../../../core/utils/base_url.dart';

/// A contract for making remote API calls to a chatbot service.
/// It defines a method for sending a chat request and receiving a response.
abstract class ChatRemoteDataSource {
  /// Sends a [ChatRequest] and returns a [ChatResponseModel].
  Future<ChatResponseModel> getResponse(ChatRequest request);
}

/// An implementation of [ChatRemoteDataSource] that communicates with a chatbot API.
class ChatRemoteDataSourceImpl implements ChatRemoteDataSource {
  final http.Client client;
  String baseUrl = getBaseUrl();

  /// Constructs a [ChatRemoteDataSourceImpl] instance with a [http.Client].
  ChatRemoteDataSourceImpl({required this.client});

  /// Sends a [ChatRequest] to the chatbot API and returns a [ChatResponseModel].
  ///
  /// It creates a [ChatRequestModel] from the provided [ChatRequest],
  /// converts it to JSON, and sends a POST request to the chatbot API.
  /// The response is then parsed and returned as a [ChatResponseModel].
  ///
  /// Throws a [ServerException] if the API request fails.
  Future<ChatResponseModel> getResponse(ChatRequest request) async {
    try {
      final chatModel = ChatRequestModel(
        address: request.address,
        isNew: request.isNew,
        message: request.message,
      );

      final jsonBody = chatModel.toJson();

      final response = await client.post(
        Uri.parse("https://hakim-hub.onrender.com/api/Chat"),
        body: json.encode(jsonBody),
        headers: {HttpHeaders.contentTypeHeader: 'application/json'},
      );

      if (response.statusCode == 200) {
        final jsonResponse = json.decode(response.body)["value"];
        return ChatResponseModel.fromJson(jsonResponse);
      } else {
        throw ServerException();
      }
    } catch (e) {
      throw ServerException();
    }
  }
}
