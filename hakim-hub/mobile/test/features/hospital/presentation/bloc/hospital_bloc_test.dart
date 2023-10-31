import 'dart:convert';

import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/core/error/failures.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/hospital_detail_model.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/bloc/hospital_detail_bloc.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import 'package:hakim_hub_mobile/features/hospital/domain/entities/filter_doctor_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_detail_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/usecases/get_doctor_by_filter.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/usecases/get_hospital_detail.dart';

// Import the generated mock classes
import '../../../../fixtures/fixture_reader.dart';
import 'hospital_bloc_test.mocks.dart';

// Use the @GenerateMocks annotation to generate the mocks
@GenerateMocks([
  GetDoctorByFilter,
  GetHospitalDetail,
])
void main() {
  late MockGetDoctorByFilter getDoctorByFilter;
  late MockGetHospitalDetail getHospitalDetail;
  late HospitalDetailBloc hospitalDetailBloc;

  setUp(() {
    getDoctorByFilter = MockGetDoctorByFilter();
    getHospitalDetail = MockGetHospitalDetail();
    hospitalDetailBloc = HospitalDetailBloc(
      getDoctorByFilter: getDoctorByFilter,
      getHospitalDetail: getHospitalDetail,
    );
  });
  tearDown(() {
    hospitalDetailBloc.close();
  });

  group('HospitalDetailBloc', () {
    test('initial state should be HospitalDetailInitial', () {
      expect(hospitalDetailBloc.state, HospitalDetailInitial());
    });

    test('emits DetailHospitalSuccess when hospital detail loading succeeds',
        () async {
      final hospitalId = 'hospital_123';
      final hospitalDetail = InstitutionDetailModel.fromJson(
          json.decode(fixture('institutiondetail.json'))['value']);

      when(getHospitalDetail(hospitalId)).thenAnswer((_) async {
        return Right(hospitalDetail);
      });

      // act
      hospitalDetailBloc.add(HospitalDetailGetEvent(id: hospitalId));

      // assert
      await expectLater(
        hospitalDetailBloc.stream,
        emitsInOrder([
          isA<DetailHospitalLoading>(),
          isA<DetailHospitalSuccess>().having(
              (state) => state.institutionDetailDomain,
              'hospitalDetail',
              hospitalDetail),
        ]),
      );
    });
    test('emits DetailHospitalError when hospital detail loading fails',
        () async {
      final hospitalId = 'hospital_123';

      when(getHospitalDetail(hospitalId)).thenAnswer((_) async {
        return Left(ServerFailure());
      });

      // act
      hospitalDetailBloc.add(HospitalDetailGetEvent(id: hospitalId));

      // assert
      await expectLater(
        hospitalDetailBloc.stream,
        emitsInOrder([
          isA<DetailHospitalLoading>(),
          isA<DetailHospitalError>()
              .having((state) => state.message, 'message', 'ServerFailure()'),
        ]),
      );
    });

    test('emits DetailHospitalSuccess when doctor filtering succeeds',
        () async {
      final filter = DoctorFilterDomain(
        institutionId: '1',
        experienceYears: '2',
        educationalName: 'Test Education',
        specialities: ['Test Speciality'],
      );
      final hospitalDetail = InstitutionDetailModel.fromJson(
          json.decode(fixture('institutiondetail.json'))['value']);

      when(getDoctorByFilter(filter)).thenAnswer((_) async {
        return Right(hospitalDetail.doctors);
      });

      // act
      hospitalDetailBloc.add(DoctorFilterEvent(
          filter: filter, institutionDetailDomain: hospitalDetail));

      // assert
      await expectLater(
        hospitalDetailBloc.stream,
        emitsInOrder([
          isA<DetailHospitalLoading>(),
          isA<DetailHospitalSuccess>().having(
              (state) => state.institutionDetailDomain.doctors,
              'filteredDoctors',
              hospitalDetail.doctors),
        ]),
      );
    });

    test('emits DetailHospitalError when doctor filtering fails', () async {
      final filter = DoctorFilterDomain(
        institutionId: '1',
        experienceYears: '2',
        educationalName: 'Test Education',
        specialities: ['Test Speciality'],
      );
      final hospitalDetail = InstitutionDetailModel.fromJson(
          json.decode(fixture('institutiondetail.json'))['value']);

      when(getDoctorByFilter(filter)).thenAnswer((_) async {
        return Left(ServerFailure());
      });

      // act
      hospitalDetailBloc.add(DoctorFilterEvent(
          filter: filter, institutionDetailDomain: hospitalDetail));

      // assert
      await expectLater(
        hospitalDetailBloc.stream,
        emitsInOrder([
          isA<DetailHospitalLoading>(),
          isA<DetailHospitalError>()
              .having((state) => state.message, 'message', 'ServerFailure()'),
        ]),
      );
    });
  });
}
