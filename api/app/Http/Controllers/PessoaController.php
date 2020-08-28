<?php

namespace App\Http\Controllers;

use Helpers;
use Illuminate\Http\Request;

class PessoaController extends Controller
{
    public function index()
    {
        $pessoa = \App\Pessoa::all();
        if (!$pessoa) {
            return response(['response' => 'Não existe Pessoa'], 400);
        }

        return response(['dados' => $pessoa]);
    }

    public function store(Request $request)
    {
        $pessoa = \App\Pessoa::create($request->all());
        if (!$pessoa) {
            return  response(['response' => 'Erro ao salvar Pessoa'], 400);
        }

        return response(['response' => 'Salvo com sucesso', 'dados' => $pessoa]);
    }

    public function show($id)
    {
        $pessoa = \App\Pessoa::find($id);
        if (!$pessoa) {
            return response(['response' => 'Não existe Pessoa'], 400);
        }

        return response($pessoa);
    }

    public function update(Request $request, $id)
    {
        $pessoa = \App\Pessoa::find($id);

        if (!$pessoa) {
            return response(['response' => 'Pessoa Não encontrado'], 400);
        }
        $pessoa = Helpers::processarColunasUpdate($pessoa, $request->all());

        if (!$pessoa->update()) {
            return response(['response' => 'Erro ao alterar'], 400);
        }

        return response(['response' => 'Atualizado com sucesso']);
    }

    public function destroy($id)
    {
        $pessoa = \App\Pessoa::find($id);

        if (!$pessoa) {
            return response(['response' => 'Pessoa Não encontrado'], 400);
        }
        $pessoa->bo_ativo = false;
        if (!$pessoa->save()) {
            return response(['response' => 'Erro ao deletar Pessoa'], 400);
        }

        return response(['response' => 'Pessoa Inativado com sucesso']);
    }
}
