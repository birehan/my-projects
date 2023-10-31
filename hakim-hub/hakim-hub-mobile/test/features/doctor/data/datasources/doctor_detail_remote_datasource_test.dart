import 'dart:convert';

import 'package:hakim_hub_mobile/core/error/exception.dart';
import 'package:hakim_hub_mobile/features/doctor/data/datasources/doctor_detail_remote_datasource.dart';
import 'package:hakim_hub_mobile/features/doctor/data/models/doctor_detail_model.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/hospital_doctor_model.dart';
import 'package:http/http.dart' as http;

import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import '../../../../fixtures/fixture_reader.dart';
import '../../../hospital/data/datasources/hospital_detail_remote_datasource_test.mocks.dart';

@GenerateMocks([http.Client])
void main() {
  late DoctorDetailRemoteDataSourceImpl remoteDataSourceImpl;
  late MockClient mockClient;
  setUp(() {
    mockClient = MockClient();
    remoteDataSourceImpl = DoctorDetailRemoteDataSourceImpl(client: mockClient);
  });

  group("getDoctorDetail", () {
    final fixtureData = fixture('doctor_detail_response.json');
    final sampleResponse = json.decode(fixtureData);
    final doctorDetail = Map<String, dynamic>.from(sampleResponse["value"]);
    final tDoctorModel = DoctorDetailModel.fromJson(doctorDetail);
    const doctorId = 'id';
    test(
      "should perform a get request on a URL",
      () async {
        when(mockClient.get(any, headers: anyNamed('headers')))
            .thenAnswer((_) async => http.Response(fixtureData, 200));
        final response = await remoteDataSourceImpl.getDoctorDetail(doctorId);
        verify(
          mockClient.get(
            Uri.parse(
                'https://hakim-hub.onrender.com/api/DoctorProfiles/$doctorId'),
            headers: {
              'Content-Type': 'application/json',
            },
          ),
        );
        expect(response, equals(tDoctorModel));
      },
    );

    test("should return DoctorDetailModel when the reponse is 200 (success)",
        () async {
      when(mockClient.get(any, headers: anyNamed('headers'))).thenAnswer(
        (_) async => http.Response(fixture('doctor_detail_response.json'), 200),
      );
      final result = await remoteDataSourceImpl.getDoctorDetail(doctorId);
      expect(result, equals(tDoctorModel));
    });

    test(
        "should throw a serverexception when the response code is 404 or other",
        () async {
      when(mockClient.get(any, headers: anyNamed('headers'))).thenAnswer(
        (_) async => http.Response('Something went wrong', 404),
      );

      final call = remoteDataSourceImpl.getDoctorDetail;
      expect(
          () => call(doctorId), throwsA(const TypeMatcher<ServerException>()));
    });
  });
}
