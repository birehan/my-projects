import 'package:equatable/equatable.dart';

/// Represents a Doctor entity for chat interactions.
///
/// This class models a doctor who can be part of a chat conversation. It contains
/// essential details about the doctor, including their [fullName], [photoUrl],
/// [id], and [speciality].

class ChatDoctorEntity extends Equatable {
  /// The full name of the doctor.
  final String fullName;

  /// The URL to the doctor's photo.
  final String photoUrl;

  /// The unique identifier of the doctor.
  final String id;

  /// The specialization of the doctor.
  final String speciality;

  /// Creates a [ChatDoctorEntity] with the given details.
  const ChatDoctorEntity({
    required this.fullName,
    required this.photoUrl,
    required this.id,
    required this.speciality,
  });

  @override
  List<Object?> get props => [id];
}
