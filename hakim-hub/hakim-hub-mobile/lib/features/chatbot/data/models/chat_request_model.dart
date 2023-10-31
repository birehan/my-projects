/// This file defines a model class, [ChatRequestModel], that represents a chat request
/// within the chatbot application.
///
/// The [ChatRequestModel] class extends [ChatRequest] and provides methods to convert
/// a chat request into a JSON representation that can be used for sending to the server.


import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_request_entity.dart';

/// A model class that represents a chat request for the chatbot application.
class ChatRequestModel extends ChatRequest {
  /// Constructs a [ChatRequestModel] instance with the provided data.
  ///
  /// The [address], [isNew], and [message] parameters are required.
  ChatRequestModel({
    required String address,
    required bool isNew,
    required String message,
  }) : super(
          address: address,
          isNew: isNew,
          message: message,
        );

  /// Converts the chat request to a JSON representation.
  ///
  /// Returns a [Map] containing the chat request data in JSON format.
  Map<String, dynamic> toJson() {
    return {
      "Address": address,
      "isNewChat": isNew,
      "message": message,
    };
  }
}
