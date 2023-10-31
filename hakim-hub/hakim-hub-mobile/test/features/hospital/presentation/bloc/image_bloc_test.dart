import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/image_bloc/image_bloc.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/image_bloc/image_event.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/image_bloc/image_state.dart';
import 'package:bloc_test/bloc_test.dart';

void main() {
  group('ImageLoadBloc', () {
    blocTest<ImageLoadBloc, ImageLoadState>(
      'emits ImageLoadedState when ImageLoaded is added',
      build: () => ImageLoadBloc(),
      act: (bloc) => bloc.add(ImageLoaded()),
      expect: () => [
        ImageLoadedState(),
      ],
    );
  });
}
