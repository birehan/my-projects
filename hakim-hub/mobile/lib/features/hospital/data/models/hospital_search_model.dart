import '../../domain/entities/hospital_search_domain.dart';
import 'hospital_address.dart';
import 'hospital_availability.dart';

class InstitutionSearchModel extends InstitutionSearchDomain {
  InstitutionSearchModel({
    required String institutionName,
    required String branchName,
    required String website,
    required String phoneNumber,
    required String summary,
    required DateTime establishedOn,
    required double rate,
    required String status,
    required String logoUrl,
    required String bannerUrl,
    required InstitutionAvailabilityModel institutionAvailability,
    required AddressModel address,
    required services,
    required id,
  }) : super(
          institutionName: institutionName,
          branchName: branchName,
          website: website,
          phoneNumber: phoneNumber,
          summary: summary,
          establishedOn: establishedOn,
          rate: rate,
          status: status,
          logoUrl: logoUrl,
          bannerUrl: bannerUrl,
          institutionAvailability: institutionAvailability,
          address: address,
          services: services,
          id: id,
        );

  factory InstitutionSearchModel.fromJson(Map<String, dynamic> json) {
    return InstitutionSearchModel(
      institutionName: json['institutionName'] ?? "institutionName",
      branchName: json['branchName'] ?? "branchName",
      website: json['website'] ?? "website",
      phoneNumber: json['phoneNumber'] ?? "phoneNumber",
      summary: json['summary'] ?? "summary",
      establishedOn: DateTime.parse(json['establishedOn'] ?? DateTime.now().toString()) ,
      rate: (json['rate'] ?? "0.0").toDouble(),
      status: json['status'] ?? "Close",
      logoUrl: json['logoUrl'] ?? "assets/images/hospital_img.png",
      bannerUrl: json['bannerUrl'] ?? "assets/images/hospital_img.png",
      institutionAvailability: InstitutionAvailabilityModel.fromJson(
          json['institutionAvailability'] ?? {}),
      address: AddressModel.fromJson(json['address'] ?? {}),
      services: List<String>.from(json['services'] ?? ["General","Cardio"]),
      id: json['id']?? "ss",
    );
  }
}
