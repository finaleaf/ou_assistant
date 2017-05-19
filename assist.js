$( document ).ready( function () {
	$( "div.okListDiv center" ).append( '<input type="button" value="전체 댓글 추천" id="likeAll">' );
	$( document ).on( "click", "input#likeAll", function () {
		$( "div.memoOkBtn" ).each( function () {
			$( this ).trigger( "click" );
		} );
	} );
} );

$( document ).bind( "DOMSubtreeModified", function () {

	rere();
	createCommentLinkButton();

	function rere() {
		$( ".rereMemoDiv:not(:has(.rereIconDiv))" ).each( function ( i, e ) {
			$( e )
			.append( '<div class="rereIconDiv"><img src="http://todayhumor.co.kr/board/images/memo_rere_write.gif" onclick="rere(' + e.id.substr( 7 ) + ')"></div>' );
		} );
	}

	function createCommentLinkButton() {
		var button, status_class;
		$( "div.memoWrapperDiv:not(:has(.memoLinkDiv))" ).each( function () {
			if ( $( this ).find( ".memoLinkDiv" ).length > 0 ) {
				return;
			}
			button = $( "<div />" ).addClass( "memoLinkDiv" )
			.css( { "cursor": "pointer", "font-size": "8pt", "padding-left": "15px" } )
			.text( "[댓글 링크 복사]" );

			status_class = $( this ).children( 0 ).attr( "class" ).replace( "rereMemoDiv", "" );
			if ( status_class !== undefined ) {
				button.addClass( status_class );
			}

			$( this ).append( button );
		} );
		$( document ).on( "click", "div.memoLinkDiv", function () {
			copyCommentLink( $( this ).parent().attr( "id" ).replace( "memoWrapper", "" ) );
		} );
	}

	function copyCommentLink( memoNum ) {
		var current_url = window.location.hostname + window.location.pathname + window.location.search;

		var aux = document.createElement( "input" );
		aux.setAttribute( "value", current_url + "#memoWrapper" + memoNum );
		document.body.appendChild( aux );
		aux.select();
		document.execCommand( "copy" );

		document.body.removeChild( aux );
	}
} );
