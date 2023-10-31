/// This file defines a model class, [ChatResponseModel], that represents a chatbot response
/// within the chatbot application.
///
/// The [ChatResponseModel] class extends [ChatResponse] and provides methods to deserialize
/// a chatbot response from JSON data, including associated institute information.
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_response_entity.dart';

import 'chat_institute_model.dart';

/// A model class that represents a chatbot response for the chatbot application.
class ChatResponseModel extends ChatResponse {
  /// Constructs a [ChatResponseModel] instance with the provided data.
  ///
  /// The [reply], [speciality], and [institutes] parameters are required.
  ChatResponseModel({
    required String reply,
    required String speciality,
    required List<ChatInsituteModel> institutes,
  }) : super(
          institutes: institutes,
          reply: reply,
          speciality: speciality,
        );

  /// Constructs a [ChatResponseModel] instance from a JSON map.
  ///
  /// The [json] parameter should contain the chatbot response data in JSON format,
  /// including an array of institute data. Returns a new [ChatResponseModel] instance
  /// with the parsed data.
  factory ChatResponseModel.fromJson(Map<String, dynamic> json) {
    List<dynamic> instituesList = json['institutions'] ?? [];
    List<ChatInsituteModel> institutes =
        instituesList.map((e) => ChatInsituteModel.fromJson(e)).toList();

    return ChatResponseModel(
      reply: json['reply'] ?? "",
      speciality: json['speciality'] ?? "",
      institutes: institutes,
    );
  }
}
