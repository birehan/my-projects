import '../../domain/entities/doctor_experience.dart';

class ExperienceModel extends Experience {
  ExperienceModel(
      {required title,
      required institution,
      required startDate,
      required endDate,
      required description})
      : super(
            description: description,
            endDate: endDate,
            institution: institution,
            startDate: startDate,
            title: title);

  factory ExperienceModel.fromJson(Map<String, dynamic> json) {
    return ExperienceModel(
        title: json['position'] ?? "No Title",
        institution: json['institutionName'] ?? "No Institution",
        startDate: DateTime.parse(json['startDate'] ?? DateTime.now()),
        endDate: DateTime.parse(json['endDate'] ?? DateTime.now()),
        description: json['description'] ?? "No Description");
  }
}
