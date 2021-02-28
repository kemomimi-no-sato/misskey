# 情感
他の人のノートに、絵文字を付けて簡単にあなたの反応を伝えられる機能です。 リアクションするには、ノートの + アイコンをクリックしてピッカーを表示し、絵文字を選択します。 リアクションには[カスタム絵文字](./custom-emoji)も使用できます。

## リアクションピッカーのカスタマイズ
ピッカーに表示される絵文字を自分好みにカスタマイズすることができます。 設定の「リアクション」で設定します。

## リモート投稿へのリアクションについて
リアクションはMisskeyオリジナルの機能であるため、リモートインスタンスがMisskeyでない限りは、ほとんどの場合「Like」としてアクティビティが送信されます。一般的にはLikeは「お気に入り」として実装されているようです。 また、相手がMisskeyであったとしても、カスタム絵文字リアクションは伝わらず、自動的に「👍」等にフォールバックされます。

## リモートからのリアクションについて
リモートから「Like」アクティビティを受信したとき、Misskeyでは「👍」のリアクションとして解釈されます。