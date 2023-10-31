import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/filter_hospital_model.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/filter_hospital_domain.dart';

void main() {
  group('FilterHospitalModel tests', () {
    final activeFor = 5;
    final openNow = true;
    final services = ['Ambulance', 'Diagnostics'];
    final filterHospitalModel = FilterHospitalModel(
      activeFor: activeFor,
      openNow: openNow,
      services: services,
    );

    test('should be a subclass of FilterHospitalDomain entity', () async {
      expect(filterHospitalModel, isA<FilterHospitalDomain>());
    });

    test('should convert a FilterHospitalModel to a JSON map', () {
      final result = filterHospitalModel.toJson();
      final expectedMap = {
        'activeFor': activeFor,
        'openNow': openNow,
        'services': services,
      };
      expect(result, expectedMap);
    });
  });
}
