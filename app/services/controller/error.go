package controller

import (
	"net/http"
)

/*
 * Error page
 */
func ErrorViewHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Here is ErrorViewHandler."))
}
