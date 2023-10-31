import 'dart:convert';
import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/core/error/exception.dart';
import 'package:hakim_hub_mobile/core/utils/base_url.dart';
import 'package:hakim_hub_mobile/features/hospital/data/datasources/hospital_detail_remote_datasource.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/filter_doctors_model.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/hospital_detail_model.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/hospital_doctor_model.dart';

import 'package:http/http.dart' as http;
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import '../../../../fixtures/fixture_reader.dart';
import 'hospital_detail_remote_datasource_test.mocks.dart';

@GenerateMocks([http.Client])
void main() {
  HospitalDetailRemoteDataSoureImpl? dataSource;
  MockClient? mockClient;

  setUp(() {
    mockClient = MockClient();
    dataSource = HospitalDetailRemoteDataSoureImpl(client: mockClient!);
  });

  group('getHospitalDetail', () {
    final tHospitalId = '33c1af21-d756-43be-97c0-916ed3d26a3b';
    final tInstitutionDetailModel = InstitutionDetailModel.fromJson(
        json.decode(fixture('institutiondetail.json'))['value']);

    final baseUrl = getBaseUrl();

    test('should perform a GET request', () async {
      //arrange
      when(mockClient!.get(any, headers: anyNamed('headers'))).thenAnswer(
          (_) async => http.Response(fixture('institutiondetail.json'), 200));
      //act
      await dataSource!.getHospitalDetail(tHospitalId);
      //assert
      verify(mockClient!.get(
          Uri.parse('$baseUrl/InsitutionProfile/$tHospitalId'),
          headers: {'content-type': 'application/json'}));
    });

    test('should return InstitutionDetailModel when the response code is 200',
        () async {
      //arrange
      when(mockClient!.get(Uri.parse('$baseUrl/InsitutionProfile/$tHospitalId'),
              headers: anyNamed('headers')))
          .thenAnswer((_) async =>
              http.Response(fixture('institutiondetail.json'), 200));
      //act
      final result = await dataSource!.getHospitalDetail(tHospitalId);
      //assert
      expect(result, equals(tInstitutionDetailModel));
    });

    test('should throw a ServerException the response code is not 200',
        () async {
      when(mockClient!.get(any, headers: anyNamed('headers')))
          .thenAnswer((_) async => http.Response('Something went wrong', 404));

      final call = dataSource!.getHospitalDetail;

      expect(() => call(tHospitalId), throwsA(isA<ServerException>()));
    });
  });

  group('getDoctorByFilter', () {
    final tDoctorFilterModel = DoctorFilterModel(
      institutionId: '33c1af21-d756-43be-97c0-916ed3d26a3b',
      experienceYears: '-1',
      educationalName: 'Test Education',
      specialities: [],
    );

    test('should perform a POST request', () async {
      when(mockClient!
              .post(any, headers: anyNamed('headers'), body: anyNamed('body')))
          .thenAnswer((_) async => http.Response('{"value": []}', 200));

      dataSource!.getDoctorByFilter(tDoctorFilterModel);

      verify(mockClient!
          .post(any, headers: anyNamed('headers'), body: anyNamed('body')));
    });

    test('should return list of DoctorModel when the response code is 200',
        () async {
      when(mockClient!
              .post(any, headers: anyNamed('headers'), body: anyNamed('body')))
          .thenAnswer(
              (_) async => http.Response(fixture('doctorfilter.json'), 200));

      final result = await dataSource!.getDoctorByFilter(tDoctorFilterModel);

      expect(result, equals([]));
    });
    
    test('should throw a ServerException when the response code is not 200',
        () async {
      when(mockClient!
              .post(any, headers: anyNamed('headers'), body: anyNamed('body')))
          .thenAnswer((_) async => http.Response('Something went wrong', 404));

      final call = dataSource!.getDoctorByFilter;

      expect(() => call(tDoctorFilterModel), throwsA(isA<ServerException>()));
    });
  });
}
