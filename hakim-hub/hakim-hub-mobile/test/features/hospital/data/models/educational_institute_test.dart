import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/eductational_institution.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/educational_institute.dart';

void main() {
  final institutionName = 'Test Institute';
  final logoUrl = 'https://example.com/logo.png';
  final id = '1234';
  final educationInstituteModel = EducationInstituteModel(
    institutionName: institutionName,
    logoUrl: logoUrl,
    id: id,
  );
  final jsonMap = {
    'institutionName': institutionName,
    'logoUrl': logoUrl,
    'id': id,
  };

  test(
    'should be a subclass of EductationalInstitutionDomain entity',
    () async {
      expect(educationInstituteModel, isA<EductationalInstitutionDomain>());
    },
  );

  test('should create a EducationInstituteModel object from a JSON map', () {
    final result = EducationInstituteModel.fromJson(jsonMap);
    expect(result, educationInstituteModel);
  });

  test('should create a JSON map from a EducationInstituteModel object', () {
    final result = educationInstituteModel.toJson();
    expect(result, jsonMap);
  });

  test('should return a list of EducationInstituteModel from a list of JSON',
      () {
    final List<Map<String, dynamic>> jsonList = [
      {
        'institutionName': 'Test Institute 1',
        'logoUrl': 'https://example.com/logo1.png',
        'id': '1234',
      },
      {
        'institutionName': 'Test Institute 2',
        'logoUrl': 'https://example.com/logo2.png',
        'id': '5678',
      },
    ];

    final expectedList = [
      EducationInstituteModel(
        institutionName: 'Test Institute 1',
        logoUrl: 'https://example.com/logo1.png',
        id: '1234',
      ),
      EducationInstituteModel(
        institutionName: 'Test Institute 2',
        logoUrl: 'https://example.com/logo2.png',
        id: '5678',
      ),
    ];
    final List<EducationInstituteModel> instituteList =
        jsonList.map((json) => EducationInstituteModel.fromJson(json)).toList();

    expect(instituteList, expectedList);
  });
}
