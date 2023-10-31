import '../../domain/entities/hospital_availability_domain.dart';

class InstitutionAvailabilityModel extends InstitutionAvailabilityDomain {
  InstitutionAvailabilityModel({
    required String startDay,
    required String endDay,
    required String opening,
    required String closing,
    required bool twentyFourHours,
    required String id,
  }) : super(
          startDay: startDay,
          endDay: endDay,
          opening: opening,
          closing: closing,
          twentyFourHours: twentyFourHours,
          id: id,
        );

  factory InstitutionAvailabilityModel.fromJson(Map<String, dynamic> json) {
    return InstitutionAvailabilityModel(
      startDay: json['startDay'] ?? "0",
      endDay: json['endDay'] ?? "5",
      opening: json['opening'] ?? "06:30",
      closing: json['closing'] ?? "12:30",
      twentyFourHours: json['twentyFourHours'] ?? false,
      id: json['id'] ?? "id",
    );
  }
  Map<String, dynamic> toJson() {
    return {
      'startDay': startDay,
      'endDay': endDay,
      'opening': opening,
      'closing': closing,
      'twentyFourHours': twentyFourHours,
      'id': id,
    };
  }
}
