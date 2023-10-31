import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/core/error/failures.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/entities/doctor_detail.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/usecases/doctor_detail_usecase.dart';
import 'package:hakim_hub_mobile/features/doctor/presentation/bloc/doctor_detail_bloc.dart';

import 'package:mockito/mockito.dart';
import 'package:mockito/annotations.dart';

import 'doctor_detail_bloc_test.mocks.dart';

@GenerateMocks([GetDoctorDetail])
void main() {
  late DoctorDetailBloc doctorDetailBloc;
  late MockGetDoctorDetail mockGetDoctorDetail;

  setUp(() {
    mockGetDoctorDetail = MockGetDoctorDetail();
    doctorDetailBloc = DoctorDetailBloc(getDoctorDetail: mockGetDoctorDetail);
  });

  test('Initial state should be DoctorDetailInitialState', () {
    expect(doctorDetailBloc.state, equals(DoctorDetailInitialState()));
  });

  test(
      'emits DoctorDetailLoadingState and DoctorDetailSuccessState on successful response',
      () {
    final mockDoctorDetail = DoctorDetail(
      fullName: "fullName",
      about: "about",
      educations: const [],
      email: "",
      experiences: const [],
      gender: "M",
      id: "id",
      mainInstitutionId: "mainInstitutionId",
      mainInstitutionName: "mainInstitutionName",
      photoUrl: "photoUrl",
      specialities: const [],
      yearsOfExperience: 2,
    );

    when(mockGetDoctorDetail(any))
        .thenAnswer((_) async => Right(mockDoctorDetail));
    doctorDetailBloc.add(GetDoctorDetailEvent(doctorDetailId: "id"));

    expectLater(
        doctorDetailBloc.stream,
        emitsInOrder([
          DoctorDetailLoadingState(),
          DoctorDetailSuccessState(doctorDetail: mockDoctorDetail),
        ]));
  });

  test('Emits DoctorDetailLoadingState and DoctorDetailFailureState on error',
      () {
    final mockError = ServerFailure();

    when(mockGetDoctorDetail(any)).thenAnswer((_) async => Left(mockError));
    doctorDetailBloc.add(GetDoctorDetailEvent(doctorDetailId: "id"));

    expectLater(
        doctorDetailBloc.stream,
        emitsInOrder([
          DoctorDetailLoadingState(),
          DoctorDetailFailureState(error: mockError),
        ]));
  });

  tearDown(() {
    doctorDetailBloc.close();
  });
}
