import 'package:hakim_hub_mobile/features/hospital/data/models/eductational_institution.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_detail_domain.dart';
import 'hospital_address.dart';
import 'hospital_availability.dart';
import 'hospital_doctor_model.dart';

class InstitutionDetailModel extends InstitutionDetailDomain {
  InstitutionDetailModel({
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
    required List<String> services,
    required List<String> photos,
    required List<DoctorModel> doctors,
    required List<EducationInstituteModel> educationalInstitutions,
    required String id,
    required List<String> allSpecialities,
  }) : super(
          educationalInstitutions: educationalInstitutions,
          allSpecialities: allSpecialities,
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
          photos: photos,
          doctors: doctors,
          id: id,
        );

  factory InstitutionDetailModel.fromJson(Map<String, dynamic> json) {
    List<dynamic> returnedEducationInstitutuions =
        json['allEducationalInstitutions'] ?? [];
    List<dynamic> returnedDoctors = json['doctors'] ?? [];

    // List<EducationInstituteModel> educationInstituteModel =
    //     List<EducationInstituteModel>.from(returnedEducationInstitutuions
    //         .map((x) => EducationInstituteModel.fromJson(x)));

    List<EducationInstituteModel> educationInstituteModel =
        returnedEducationInstitutuions
            .map((x) => EducationInstituteModel.fromJson(x))
            .toList();
    print(returnedDoctors);
    print("before doctors");
    List<DoctorModel> returnedDoctorsModel =
        returnedDoctors.map((x) => DoctorModel.fromJson(x)).toList();

    return InstitutionDetailModel(
      educationalInstitutions: educationInstituteModel,
      allSpecialities: List<String>.from(json['allSpecialities'] ?? []),
      id: json['id'] ?? '',
      institutionName: json['institutionName'] ?? '',
      branchName: json['branchName'] ?? '',
      website: json['website'] ?? '',
      phoneNumber: json['phoneNumber'] ?? '',
      summary: json['summary'] ?? '',
      establishedOn:
          DateTime.parse(json['establishedOn'] ?? "2006-01-01T21:00:00"),
      rate: (json['rate'] ?? 0.0).toDouble(),
      status: json['status'] ?? '',
      logoUrl: json['logoUrl'] ?? 'assets/images/doctor_image.png',
      bannerUrl: json['bannerUrl'] ?? 'assets/images/tikur_anbesa.png',
      institutionAvailability: InstitutionAvailabilityModel.fromJson(
          json['institutionAvailability'] ?? {}),
      address: AddressModel.fromJson(json['address'] ?? {}),
      services: List<String>.from(json['services'] ?? []),
      photos: List<String>.from(json['photos'] ?? []),
      doctors: returnedDoctorsModel,
    );
  }
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();

    data['allEducationalInstitutions'] =
        educationalInstitutions.map((e) => e.toJson()).toList();
    data['allSpecialities'] = allSpecialities;
    data['id'] = id;
    data['institutionName'] = institutionName;
    data['branchName'] = branchName;
    data['website'] = website;
    data['phoneNumber'] = phoneNumber;
    data['summary'] = summary;
    data['establishedOn'] = establishedOn.toIso8601String();
    data['rate'] = rate;
    data['status'] = status;
    data['logoUrl'] = logoUrl;
    data['bannerUrl'] = bannerUrl;
    data['institutionAvailability'] = institutionAvailability.toJson();
    data['address'] = address.toJson();
    data['services'] = services;
    data['photos'] = photos;
    data['doctors'] = doctors.map((e) => e.toJson()).toList();

    return data;
  }
}
