import 'package:equatable/equatable.dart';

abstract class ImageLoadState extends Equatable {}

class ImageNotLoadedState extends ImageLoadState {
  @override
  List<Object?> get props => [];
}

class ImageLoadingState extends ImageLoadState {
  @override
  List<Object?> get props => [];
}

class ImageLoadedState extends ImageLoadState {
  @override
  List<Object?> get props => [];
}
