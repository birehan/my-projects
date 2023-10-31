// SearchBarEvent.dart
abstract class SearchBarEvent {}

class SearchSubmitted extends SearchBarEvent {
  final String searchWord;

  SearchSubmitted(this.searchWord);
}

class SearchChanged extends SearchBarEvent {
  final String searchWord;

  SearchChanged(this.searchWord);
}