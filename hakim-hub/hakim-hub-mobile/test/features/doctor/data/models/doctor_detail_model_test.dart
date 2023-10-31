import 'dart:convert';
import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/features/doctor/data/models/doctor_detail_model.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/entities/doctor_detail.dart';

import '../../../../fixtures/fixture_reader.dart';

void main() {
  final tDoctorDetailModel = DoctorDetailModel(
    fullName: "fullName",
    about: "about",
    gender: "gender",
    email: "email",
    photoUrl: "photoUrl",
    yearsOfExperience: 5,
    mainInstitutionId: "mainInstitutionId",
    mainInstitutionName: "mainInstitutionName",
    specialities: [],
    educations: [],
    experiences: [],
    id: "id",
  );
  test('should be a subclass of DoctorDetail Entity', () async {
    expect(tDoctorDetailModel, isA<DoctorDetail>());
  });

  test("Should return a valid DoctorDetail Model when the json is valid",
      () async {
    final Map<String, dynamic> jsonMap =
        json.decode(fixture('doctor_detail.json'));
    final result = DoctorDetailModel.fromJson(jsonMap);
    expect(result, tDoctorDetailModel);
  });
}
