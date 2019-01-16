package controller

import (
	"net/http"
)

/*
 * Logout ( redirect only )
 */
func LogoutViewHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Here is ErrorViewHandler."))
}
