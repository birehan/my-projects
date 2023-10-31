import 'dart:async';
import 'dart:convert';

import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/core/error/exception.dart';
import 'package:hakim_hub_mobile/core/error/failures.dart';
import 'package:hakim_hub_mobile/core/network/network_info.dart';
import 'package:hakim_hub_mobile/features/hospital/data/datasources/hospital_detail_remote_datasource.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/filter_doctors_model.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/hospital_availability.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/hospital_detail_model.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/hospital_doctor_model.dart';
import 'package:hakim_hub_mobile/features/hospital/data/repositories/hospital_detail_repository_impl.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/filter_doctor_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_detail_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_doctor_domain.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import '../../../../fixtures/fixture_reader.dart';
import 'hospital_detail_repository_test.mocks.dart';

@GenerateMocks([
  HospitalDetailRemoteDataSource,
  NetworkInfo,
])
void main() {
  late HospitalDetailRepositoryImpl repository;
  late MockHospitalDetailRemoteDataSource mockRemoteDataSource;
  late MockNetworkInfo mockNetworkInfo;

  setUp(() {
    mockRemoteDataSource = MockHospitalDetailRemoteDataSource();
    mockNetworkInfo = MockNetworkInfo();
    repository = HospitalDetailRepositoryImpl(
      remoteDataSource: mockRemoteDataSource,
      networkInfo: mockNetworkInfo,
    );
  });

  group('getHospitalDetail', () {
    final tHospitalID = '1';
    final tHospitalDetail = InstitutionDetailModel.fromJson(
        json.decode(fixture('institutiondetail.json'))['value']);

    test('should check if the device is online', () async {
      // arrange
      when(mockNetworkInfo.isConnected).thenAnswer((_) async => true);
      when(mockRemoteDataSource.getHospitalDetail(any))
          .thenAnswer((_) async => tHospitalDetail);
      // act
      await repository.getHospitalDetail(tHospitalID);
      // assert
      verify(mockNetworkInfo.isConnected);
    });

    group('device is online', () {
      setUp(() {
        when(mockNetworkInfo.isConnected).thenAnswer((_) async => true);
      });

      test(
          'should return remote data when the call to remote data source is successful',
          () async {
        // arrange
        when(mockRemoteDataSource.getHospitalDetail(any))
            .thenAnswer((_) async => tHospitalDetail);
        // act
        final result = await repository.getHospitalDetail(tHospitalID);
        // assert
        verify(mockRemoteDataSource.getHospitalDetail(tHospitalID));
        expect(result, equals(Right(tHospitalDetail)));
      });

      test(
          'should return a ServerFailure when the call to remote data source is unsuccessful',
          () async {
        // arrange
        when(mockRemoteDataSource.getHospitalDetail(any))
            .thenThrow(ServerException());
        // act
        final result = await repository.getHospitalDetail(tHospitalID);
        // assert
        verify(mockRemoteDataSource.getHospitalDetail(tHospitalID));
        expect(result, equals(Left(ServerFailure())));
      });
    });

    group('device is offline', () {
      setUp(() {
        when(mockNetworkInfo.isConnected).thenAnswer((_) async => false);
      });

      test('should return a ServerFailure when there is no internet connection',
          () async {
        // act
        final result = await repository.getHospitalDetail(tHospitalID);
        // assert
        verifyZeroInteractions(mockRemoteDataSource);
        expect(result, equals(Left(ServerFailure())));
      });
    });
  });

  group('getFilteredDoctors', () {
    final tDoctorFilterDomain = DoctorFilterDomain(
      institutionId: '1',
      experienceYears: '2',
      educationalName: 'Test Education',
      specialities: ['Test Speciality'],
    );
    final tDoctorFilterModel = DoctorFilterModel(
      institutionId: '1',
      experienceYears: '2',
      educationalName: 'Test Education',
      specialities: ['Test Speciality'],
    );
    final tInstitutionDetailModel = InstitutionDetailModel.fromJson(
        json.decode(fixture('institutiondetail.json'))['value']);

    test('should check if the device is online', () async {
      // arrange
      when(mockNetworkInfo.isConnected).thenAnswer((_) async => true);
      when(mockRemoteDataSource.getDoctorByFilter(any))
          .thenAnswer((_) async => []);
      // act
      await repository.getFilteredDoctors(tDoctorFilterDomain);
      // assert
      verify(mockNetworkInfo.isConnected);
    });

    group('device is online', () {
      setUp(() {
        when(mockNetworkInfo.isConnected).thenAnswer((_) async => true);
      });

      test(
          'should return remote data when the call to remote data source is successful',
          () async {
        // arrange
        when(mockRemoteDataSource.getDoctorByFilter(any)).thenAnswer(
          (_) async => Future.value(
              tInstitutionDetailModel.doctors as FutureOr<List<DoctorModel>>?),
        );
        // act
        final result = await repository.getFilteredDoctors(tDoctorFilterDomain);
        // assert
        verify(mockRemoteDataSource.getDoctorByFilter(tDoctorFilterModel));
        expect(result, equals(Right(tInstitutionDetailModel.doctors)));
      });

      test(
          'should return a ServerFailure when the call to remote data source is unsuccessful',
          () async {
        // arrange
        when(mockRemoteDataSource.getDoctorByFilter(any))
            .thenThrow(ServerException());
        // act
        final result = await repository.getFilteredDoctors(tDoctorFilterDomain);
        // assert
        verify(mockRemoteDataSource.getDoctorByFilter(tDoctorFilterModel));
        expect(result, equals(Left(ServerFailure())));
      });
    });

    group('device is offline', () {
      setUp(() {
        when(mockNetworkInfo.isConnected).thenAnswer((_) async => false);
      });

      test('should return a ServerFailure when there is no internet connection',
          () async {
        // act
        final result = await repository.getFilteredDoctors(tDoctorFilterDomain);
        // assert
        verifyZeroInteractions(mockRemoteDataSource);
        expect(result, equals(Left(ServerFailure())));
      });
    });
  });
}
