import 'dart:convert';

import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/hospital_detail_model.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/search_doctors_bloc/search_doctors_bloc.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/search_doctors_bloc/search_doctors_event.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/search_doctors_bloc/search_doctors_state.dart';

import '../../../../fixtures/fixture_reader.dart';

void main() {
  group('SearchBarBloc', () {
    final mockDoctors = InstitutionDetailModel.fromJson(
            json.decode(fixture('institutiondetail.json'))['value'])
        .doctors;

    blocTest<SearchBarBloc, SearchBarState>(
      'emits [SearchInitial, SearchSuccess] when search text is empty',
      build: () => SearchBarBloc(mockDoctors),
      act: (bloc) => bloc.add(SearchSubmitted('')),
      expect: () => [
        SearchSuccess(mockDoctors),
      ],
    );

    blocTest<SearchBarBloc, SearchBarState>(
      'emits [SearchInitial, SearchSuccess] when search text matches doctor name',
      build: () => SearchBarBloc(mockDoctors),
      act: (bloc) => bloc.add(SearchSubmitted('John')),
      expect: () => [
        SearchSuccess([]),
      ],
    );
    // Other tests
  });
}
