import 'package:equatable/equatable.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_doctor_entity.dart';

/// Represents an institute entity for chat interactions.
/// This class models an institute that can be part of a chat conversation. It includes
/// important details about the institute, such as its [instituteName], a list of associated
/// [doctors], [instituteId], and [logoUrl].
class ChatInstituteEntity extends Equatable {
  /// The name of the institute.
  final String instituteName;

  /// A list of doctors associated with the institute.
  final List<ChatDoctorEntity> doctors;

  /// The unique identifier of the institute.
  final String instituteId;

  /// The URL to the institute's logo.
  final String logoUrl;

  /// Creates a [ChatInstituteEntity] with the provided details.
  const ChatInstituteEntity({
    required this.instituteName,
    required this.doctors,
    required this.instituteId,
    required this.logoUrl,
  });

  @override
  // TODO: implement props
  List<Object?> get props => [instituteId];
}
