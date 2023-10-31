import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/image_bloc/image_event.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/image_bloc/image_state.dart';

class ImageLoadBloc extends Bloc<ImageLoadEvent, ImageLoadState> {
  ImageLoadBloc() : super(ImageNotLoadedState()) {
    on<ImageLoaded>((_, emit) {
      emit(ImageLoadedState());
    });
  }
}
