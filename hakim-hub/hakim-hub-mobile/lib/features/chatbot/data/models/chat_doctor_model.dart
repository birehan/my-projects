/// This file defines a model class, [ChatDoctorModel], that represents a doctor's
/// information for use within the chat application.
///
/// The [ChatDoctorModel] class extends [ChatDoctorEntity] and provides methods to
/// serialize and deserialize doctor information from JSON data.


import '../../domain/entities/chat_doctor_entity.dart';

/// A model class that represents a doctor's information for the chat application.
class ChatDoctorModel extends ChatDoctorEntity {
  /// Constructs a [ChatDoctorModel] instance with the provided data.
  ///
  /// The [fullName], [photoUrl], [id], and [speciality] parameters are required.
  ChatDoctorModel({
    required String fullName,
    required String photoUrl,
    required String id,
    required String speciality,
  }) : super(id: id, photoUrl: photoUrl, fullName: fullName, speciality: speciality);

  /// Constructs a [ChatDoctorModel] instance from a JSON map.
  ///
  /// The [json] parameter should contain the doctor's information in JSON format.
  /// Returns a new [ChatDoctorModel] instance with the parsed data.
  factory ChatDoctorModel.fromJson(Map<String, dynamic> json) {
    return ChatDoctorModel(
      fullName: json['fullName'] ?? "",
      photoUrl: json['photoUrl'] ?? "",
      id: json['id'] ?? "",
      speciality: (json['specialities'] ?? []).length > 0 ? json['specialities'][0] : "",
    );
  }
}
