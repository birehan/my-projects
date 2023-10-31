/// This file defines a model class, [ChatInsituteModel], that represents information
/// about a medical institute within the chat application.
///
/// The [ChatInsituteModel] class extends [ChatInstituteEntity] and provides methods
/// to serialize and deserialize institute information from JSON data, including
/// associated doctor data.

import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_institute_entity.dart';

import 'chat_doctor_model.dart';

/// A model class that represents information about a medical institute for the chat application.
class ChatInsituteModel extends ChatInstituteEntity {
  /// Constructs a [ChatInsituteModel] instance with the provided data.
  ///
  /// The [instituteName], [instituteId], [logoUrl], and [doctors] parameters are required.
  ChatInsituteModel({
    required String instituteName,
    required String instituteId,
    required String logoUrl,
    required List<ChatDoctorModel> doctors,
  }) : super(
          doctors: doctors,
          instituteId: instituteId,
          instituteName: instituteName,
          logoUrl: logoUrl,
        );

  /// Constructs a [ChatInsituteModel] instance from a JSON map.
  ///
  /// The [json] parameter should contain the institute's information in JSON format,
  /// including an array of doctor data. Returns a new [ChatInsituteModel] instance
  /// with the parsed data.
  factory ChatInsituteModel.fromJson(Map<String, dynamic> json) {
    List<dynamic> chatDoctorsJson = json['doctors'] ?? [];
    List<ChatDoctorModel> chatDoctors =
        chatDoctorsJson.map((e) => ChatDoctorModel.fromJson(e)).toList();

    return ChatInsituteModel(
      instituteName: json['institutionName'] ?? "",
      instituteId: json['id'] ?? "",
      logoUrl: json['logoUrl'] ?? "",
      doctors: chatDoctors,
    );
  }
}
