import 'package:hakim_hub_mobile/features/hospital/domain/entities/educational_institute.dart';

class EducationInstituteModel extends EductationalInstitutionDomain {
  String institutionName;
  String logoUrl;
  String id;

  EducationInstituteModel({
    required this.institutionName,
    required this.logoUrl,
    required this.id,
  }) : super(id: id, institutionName: institutionName, logoUrl: logoUrl);

  factory EducationInstituteModel.fromJson(Map<String, dynamic> json) {
    return EducationInstituteModel(
      institutionName: json['institutionName'] ?? " ",
      logoUrl: json['logoUrl'] ?? " ",
      id: json['id'] ?? " ",
    );
  }
  Map<String, dynamic> toJson() {
    return {
      'institutionName': institutionName,
      'logoUrl': logoUrl,
      'id': id,
    };
  }
}
