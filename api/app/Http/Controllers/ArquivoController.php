<?php

namespace App\Http\Controllers;

use Helpers;
use Illuminate\Http\Request;
use Validator;

class ArquivoController extends Controller
{
    public function index()
    {
        $arquivo = \App\Arquivo::where('bo_ativo', true)->get();
        if (!$arquivo) {
            return response(['response' => 'Não existe Arquivo'], 400);
        }

        return response(['dados' => $arquivo]);
    }

    public function store(Request $request)
    {
        $nameFile = 'imagem';

        if ($request->hasFile($nameFile)) {
            if (!$this->formataIsValid($request)) {
                return response(['response' => 'Formato inválido'], 400);
            }

            $upload = \App\Arquivo::saveFile($request->file($nameFile), 'imagens');

            if (!$upload) {
                return  response(['response' => 'Erro ao salvar Arquivo'], 400);
            }

            return response(['response' => 'Salvo com sucesso', 'dados' => $upload]);
        }

        return  response(['response' => 'Arquivo é obrigatorio'], 400);
    }

    public function show($id)
    {
        $arquivo = \App\Arquivo::find($id);
        if (!$arquivo) {
            return response(['response' => 'Não existe Arquivo'], 400);
        }

        return response($arquivo);
    }

    public function update(Request $request, $id)
    {
        if (!$this->formataIsValid($request)) {
            return response(['response' => 'Formato não permitido'], 400);
        }
        $folder = Helpers::getFirstNameFromUrlClient($request);
        $nameFile = 'file';

        return \App\Arquivo::updateFile($request->file($nameFile), $id, $folder);
    }

    public function destroy($id)
    {
        $arquivo = \App\Arquivo::find($id);

        if (!$arquivo) {
            return response(['response' => 'Arquivo Não encontrado'], 400);
        }
        $arquivo->bo_ativo = false;
        if (!$arquivo->save()) {
            return response(['response' => 'Erro ao deletar Arquivo'], 400);
        }

        return response(['response' => 'Arquivo Inativado com sucesso']);
    }

    private function formataIsValid(Request $request)
    {
        $validator = Validator::make($request->all(), ['file' => 'mimes:jpeg,png,jpg,gif,svg,webp,pdf,doc,docx']);

        if ($validator->fails()) {
            return false;
        }

        return true;
    }
}
