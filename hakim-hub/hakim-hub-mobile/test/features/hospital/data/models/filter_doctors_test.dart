import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/filter_doctors_model.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/filter_hospital_model.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/filter_doctor_domain.dart';

void main() {
  group('DoctorFilterModel tests', () {
    final institutionId = '1234';
    final experienceYears = '3';
    final educationalName = 'Test Institute';
    final specialities = ['Cardiology', 'Dermatology'];
    final doctorFilterModel = DoctorFilterModel(
      institutionId: institutionId,
      experienceYears: experienceYears,
      educationalName: educationalName,
      specialities: specialities,
    );

    test('should be a subclass of DoctorFilterDomain entity', () async {
      expect(doctorFilterModel, isA<DoctorFilterDomain>());
    });

    test('should convert a DoctorFilterModel to a JSON map', () {
      final result = doctorFilterModel.toJson();
      final expectedMap = {
        'institutionId': institutionId,
        'experienceYears': experienceYears,
        'educationalName': educationalName,
        'specialities': specialities,
      };
      expect(result, expectedMap);
    });
  });
}
